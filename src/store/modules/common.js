const state = {
	favourite:[],
	activeclass : 'pills_created',
};

const getters = {
	activeclass:(state)=>{ return state.activeclass}
	}
	
	
	const mutations = {
		active:(state,payload)=>{
			state.activeclass = payload
		},
		setFavourite:(state,payload)=>{
			let objIndex = state.favourite.findIndex((obj => obj.id === payload.id));
			if (objIndex > -1) 
			{
			state.favourite.splice(objIndex, 1);
			} else {
			state.favourite.push(payload);
			}	},
		getActive:(state,payload)=>{
			let objIndex = state.favourite.findIndex((obj => obj.id === payload));
			if (objIndex > -1) {
			return true;
			} else {
			return false;
			}
		},
		add:(state,payload)=>{
			state.bookmark.push(payload);
			
		}
	};
	
	const actions = {
		active:(context,payload)=>
		{
			context.commit('active',payload);
		},
		setFavourite:(context,payload)=>{
			context.commit('setFavourite',payload)
		},
		getActive:(context,payload)=>{
			context.commit('getActive',payload)
		}
	
	};
	
	export default {
		namespaced: true,
		state,
		getters,
		actions,
		mutations
	};