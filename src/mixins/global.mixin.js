import store from '../store/index'

const GlobalMixin = {
    computed: {
        admin(){
            const user = store.getters['user/user']
            
            if(user.role === "admin"){
                return true
            }else {
                return false
            }
        }
    },
    methods: {
        render(content) {
            const doc = new DOMParser().parseFromString(content, 'text/html')
            const textContent = doc.documentElement.textContent

            return textContent
        },
    }
}

export default GlobalMixin