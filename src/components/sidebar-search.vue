<template>

    <pf-dropdown hideArrow  :openOnButtonClick="false" :isOpen="isDropdownOpen">
        <div slot="head">
            <div class="input-group">
                <input
                    class="form-control form-control-sidebar"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    :value="searchText"
                    @input="handleSearchTextChange"
                />
                <div class="input-group-append">
                    <button class="btn btn-sidebar" @click="handleIconClick()">
                        <i
                            :class="{
                                fas: true,
                                'fa-search': searchText.length === 0,
                                'fa-times': searchText.length > 0,
                                'fa-fw': true
                            }"
                        ></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="menu" slot="body">
            <div v-if="foundMenuItems.length === 0" class="nothing-found">
                No Element found
            </div>

            <div v-if="foundMenuItems.length > 0" class="list-group">
                <router-link
                    :to="menuItem.path"
                    v-for="menuItem in foundMenuItems"
                    class="list-group-item"
                    @click="handleMenuItemClick"
                >
                    <div
                        class="search-title"
                        v-html="boldString(menuItem.name, searchText)"
                    ></div>
                    <div class="search-path">{{ menuItem.name }}</div>
                </router-link>
            </div>
        </div>
    </pf-dropdown>

</template>

<script>
import {Dropdown} from '@profabric/vue-components'

export default {
  components: {
    'pf-dropdown': Dropdown
  },
};
</script>

<script setup>
const menu = [];
const searchText = '';
const foundMenuItems = [];
const isDropdownOpen = false;

const handleSearchTextChange = (event) => {
    foundMenuItems = [];

    if (event && event.target && event.target.value) {
        searchText = event.target.value;
        findMenuItems(menu);
    }
}

const handleIconClick = () => {
    searchText = '';
    isDropdownOpen = false;
}

const handleMenuItemClick = () => {
    searchText = '';
    isDropdownOpen = false;
}

const findMenuItems = (menu) => {
    if (searchText) {
        return;
    }

    menu.forEach(menuItem => {
        if (menuItem.name
            .toLowerCase()
            .includes(searchText.toLowerCase()) &&
            menuItem.path
        ) {
            foundMenuItems.push(menuItem);
        }
        if (menuItem.children) {
            return findMenuItems(menuItem.children)
        }
    });
}

const boldString = (str, substr) => {
    return str.replaceAll(
        capitalizeFirstLetter(substr),
        `<strong class="text-light">
            ${this.capitalizeFirstLetter(
                substr
            )}
        </strong>`
    );
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>