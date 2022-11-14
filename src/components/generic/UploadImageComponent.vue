<template>
    <div class="form-group">
        <label>{{label}}</label>
        <form v-on:submit.prevent="fn">
            <input type="file" accept="image/png, image/jpeg" @change="handleFileChange($event)" />
            <button type="submit" class="btn-info mt-3" :disabled="filesSelected < 1">Upload</button>
        </form>
    </div>
</template> -->

<!-- <script>
    import axios from 'axios'

    export default ({
        name: 'UploadImageComponent',
        props: {
            label: {
                type: String
            },
            fn: {
                type: Function
            }
        },
        data() {
            return {
                results: null,
                file: null,
                filesSelected: 0,
                cloudName: process.env.VUE_APP_CLD_NAME,
                preset: process.env.VUE_APP_CLD_PRESET,
                fileContents: null,
                formData: null,
            }
        },
        methods: {
            // function to handle file info obtained from local
            // file system and set the file state
            handleFileChange: function (event) {
                //returns an array of files even though multiple not used
                this.file = event.target.files[0];
                this.filesSelected = event.target.files.length;
            },
            prepareFormData: function () {
                this.formData = new FormData();
                this.formData.append("upload_preset", this.preset)
                this.formData.append("file", this.fileContents);
            }
        }
    })
</script>