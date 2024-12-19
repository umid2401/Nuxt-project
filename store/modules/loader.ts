interface LoaderState {
    isLoading: boolean;
  }
  
  const state: LoaderState = {
    isLoading: false
  };
  
  const mutations = {
    setLoading(state: LoaderState, isLoading: boolean) {
      state.isLoading = isLoading;
    }
  };
  
  const actions = {
    showLoader({ commit }: any) {
      commit('setLoading', true);
    },
    hideLoader({ commit }: any) {
      commit('setLoading', false);
    }
  };
  
  const getters = {
    isLoading: (state: LoaderState) => state.isLoading
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  