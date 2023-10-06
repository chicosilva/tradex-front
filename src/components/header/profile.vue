<template>
  <li class="profile-nav onhover-dropdown pe-0 py-0">
    <div class="media profile-media">
      
      <div class="media-body">
        <span>{{ user.first_name }}</span>
       
      </div>
    </div>
    <ul class="profile-dropdown onhover-show-div">
      <li>
        <a @click="logout"
          ><vue-feather type="log-in"></vue-feather><span>Sair</span></a
        >
      </li>
    </ul>
  </li>
</template>

<script>
 
  export default {
    name: 'Profile',

    async mounted() {
      
    },

    methods: {
      logout: function() {
            localStorage.removeItem('User');
            localStorage.removeItem('docfacil');
            localStorage.removeItem('docfacil-refresh');  
            this.$router.replace('/auth/login');
          }
    },

    data() {
      return {
        
        user: {}
      };
  },


  };
</script>
