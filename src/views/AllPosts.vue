<template>
    <div class="container">
        <h1>All Posts</h1>
        <table>
            <tr>
                <th>title</th>
                <th>slug</th>
                <th>content</th>
                <th>likes</th>
                <th>action</th>
            </tr>
            <tr v-for="(post, index) in allPosts" :key="index">
                <td>{{ post.title }}</td>
                <td>{{ post.slug }}</td>
                <td>{{ post.content }}</td>
                <td>{{ post.likes.length }}</td>
                <td><button @click="likePost(post.id, post.likes)" :class="{liked: liked(post.likes)}">Like 👍</button></td>
            </tr>
        </table>
    </div>
</template>
<script>
    import axios from 'axios'
    import jwtDecode from 'jwt-decode'
    export default {
        data(){
            return{
                allPosts:[],
                userId: '',
                deletingLike: ''
            }
        },
        computed: {
            // liked(){
            //     return 
            // }
        },
        created(){
            const token = localStorage.getItem('token')
            const user_id = jwtDecode(token).id
            this.userId = user_id;
            axios.get('http://192.168.8.165:3000/post', {headers: {token}})
            .then((res) => {
                console.log(res)
                this.allPosts = res.data.allPost
            })
            .catch((error) => {
                console.log(error)
            })
        },
        methods: {
            likePost(postId, likes){
                const token = localStorage.getItem('token')
                const hasLiked = this.liked(likes)
                if(hasLiked) {
                    axios.delete(`http://192.168.8.165:3000/like/${this.deletingLike}`, {headers: {token}})
                    .then((res) => console.log(res))
                    .catch(err => console.log(err))
                } else {
                    axios.post('http://192.168.8.165:3000/like',{post_id: postId}, {headers: {token}})
                    .then((res) => console.log(res))
                    .catch(err => console.log(err))
                }
                this.deletingLike = ''
            },
            liked(likes){
                let isLiked = likes.find((like) => {
                    if(like.user.id == this.userId){
                        return true
                    } else {
                        return false
                    }
                })
                if(isLiked){
                    this.deletingLike = isLiked.id
                    return true
                } else {
                    this.deletingLike = ''
                    return false
                }
            }
        }
    }
</script>
<style>
    .container{
        background-color: tomato;
        min-height: 100dvh;
        width: 100%;
    }
   table, th, td{
    border: 1px solid white
   }
   .liked{
    background-color: blue;
    color: #fff;
   }
</style>