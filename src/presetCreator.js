const prompts = require('prompts');
const { resolve } = require('path');
const { writeFile } = require('fs');
const presets = require(`${__dirname}\\presets.json`);

(async () => {
    const askName = await prompts({
        type: 'text',
        name: 'name',
        message: 'Enter the name of the preset',
        validate: response => !response ? "You must enter a name!" : true
    });

    for (const preset in presets) {
        if (askName.name.toLowerCase() === presets[preset].name.toLowerCase()) {
            return console.log("Name already exists")
        }

        const askMetadata = await prompts({
            type: 'toggle',
            name: 'response',
            message: 'Add metadata, like thumbnails, title, etc'
        });

        const askVideos = await prompts({
            type: 'number',
            name: 'response',
            message: 'Search Limit, example: 10'
        });

        const askQuality = await prompts({
            type: 'number',
            name: 'response',
            message: 'Height resolution, example: 1080'
        });

        const askVideoBitrate = await prompts({
            type: 'number',
            name: 'response',
            message: 'Video Bitrate, example: 2500'
        });

        const askAudioBitrate = await prompts({
            type: 'number',
            name: 'response',
            message: 'Audio Bitrate, example: 192'
        });

        const askBass = await prompts({
            type: 'number',
            name: 'response',
            message: 'Bass Amount, example: 10'
        });

        const askTreble = await prompts({
            type: 'number',
            name: 'response',
            message: 'Treble Amount, example: 5'
        });

        const askFramerate = await prompts({
            type: 'number',
            name: 'response',
            message: 'Framerate, exampe: 30'
        });

        const askFormat = await prompts({
            type: 'text',
            name: 'response',
            message: 'Video Format (mp4, mp3 or both), example: mp4'
        });

        const askOverwrite = await prompts({
            type: 'toggle',
            name: 'response',
            message: 'Overwrite if already exists'
        });

        const askVolume = await prompts({
            type: 'text',
            name: 'response',
            message: 'Video Volume (1 = normal), example: 0.5'
        });

        if (askFormat.response) {
            if (askFormat.response !== "mp4") {
                if (askFormat.response !== "mp3") {
                    if (askFormat.response !== "both") {
                        askFormat.response = null
                    }
                }
            }
        }

        if (!askMetadata.response) askMetadata.response = false;
        if (!askVideos.response) askVideos.response = null
        if (!askQuality.response) askQuality.response = null
        if (!askVideoBitrate.response) askVideoBitrate.response = null
        if (!askBass.response) askBass.response = null
        if (!askTreble.response) askTreble.response = null
        if (!askFramerate.response) askFramerate.response = null
        if (!askFormat.response) askFormat.response = null
        if (!askOverwrite.response) askOverwrite.response = false
        if (!askVolume.response) askVolume.response = null

        presets.push({
            name: askName.name,
            config: {
                metadata: askMetadata.response,
                videos: askVideos.response,
                quality: askQuality.response,
                videoBitrate: askVideoBitrate.response,
                audioBitrate: askAudioBitrate.response,
                framerate: askFramerate.response,
                format: askFormat.response,
                overwrite: askOverwrite.response,
                volume: askVolume.response
            }
        });

        writeFile(`${__dirname}\\presets.json`, JSON.stringify(presets, null, 4), (err) => {
            if (err) return console.log("Failed to create preset, sorry!")
            console.log("Succesfully created Preset")
        });
    }
})()
