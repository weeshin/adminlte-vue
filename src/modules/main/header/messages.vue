<template>

<dropdown hideArrow >
    <div slot="head">
        <i class="far fa-comments"></i>
        <span class="badge badge-danger navbar-badge">4</span>
    </div>
    <div slot="body">
        <a href="#" class="dropdown-item">
            <div class="media">
                <image
                    src="assets/img/default-profile.png"
                    alt="User Avatar"
                    width="50"
                    height="50"
                    class="mr-2"
                    rounded
                ></image>
                <div class="media-body">
                    <h3 class="dropdown-item-title">
                        Brad Diesel
                        <span class="float-right text-sm text-danger"
                            ><i class="fas fa-star"></i
                        ></span>
                    </h3>
                    <p class="text-sm">Call me whenever you can...</p>
                    <p class="text-sm text-muted">
                        <i class="far fa-clock mr-1"></i> 4 Hours Ago
                    </p>
                </div>
            </div>
        </a>
        <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item">
            <div class="media">
                <image
                    src="assets/img/default-profile.png"
                    alt="User Avatar"
                    class="mr-2"
                    :width="50"
                    :height="50"
                    rounded
                ></image>
                <div class="media-body">
                    <h3 class="dropdown-item-title">
                        John Pierce
                        <span class="float-right text-sm text-muted"
                            ><i class="fas fa-star"></i
                        ></span>
                    </h3>
                    <p class="text-sm">I got your message bro</p>
                    <p class="text-sm text-muted">
                        <i class="far fa-clock mr-1"></i> 4 Hours Ago
                    </p>
                </div>
            </div>
        </a>
        <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item">
            <div class="media">
                <image
                    src="assets/img/default-profile.png"
                    alt="User Avatar"
                    class="mr-2"
                    :width="50"
                    :height="50"
                    rounded
                ></image>
                <div class="media-body">
                    <h3 class="dropdown-item-title">
                        Nora Silvester
                        <span class="float-right text-sm text-warning"
                            ><i class="fas fa-star"></i
                        ></span>
                    </h3>
                    <p class="text-sm">The subject goes here</p>
                    <p class="text-sm text-muted">
                        <i class="far fa-clock mr-1"></i> 4 Hours Ago
                    </p>
                </div>
            </div>
        </a>
        <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
    </div>
</dropdown>

</template>

<script lang="ts">
import {Dropdown, Image} from '@profabric/vue-components';

export default {
  components: {
    'pf-dropdown': Dropdown,
    'pf-image': Image
  },
};

</script>

<style scoped>

pf-dropdown {
    border: none;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    --pf-dropdown-menu-min-width: 18rem;

    .dropdown-item {
        padding: 0.5rem 1rem;
    }

    .text-sm {
        margin-bottom: 0;
    }
    .dropdown-divider {
        margin: 0;
    }
}


</style>