// shims-vuex.d.ts
import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  // Declare your own store states, getters, etc.
  interface State {
    // Define your state properties
  }

  // Provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
