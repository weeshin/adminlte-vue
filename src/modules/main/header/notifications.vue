<template>
<pf-dropdown hideArrow >
    <div slot="head">
        <i class="far fa-bell"></i>
        <span class="badge badge-warning navbar-badge">15</span>
    </div>
    <div slot="body">
        <span class="dropdown-item dropdown-header"
            >15 labels.notifications</span
        >
        <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item">
            <i class="fas fa-envelope mr-2"></i> 4 labels.newMessages            
            <span class="float-right text-muted text-sm"
                >3 "labels.mins"</span
            >
        </a>
        <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item">
            <i class="fas fa-users mr-2"></i> 8 labels.friendRequests            
            <span class="float-right text-muted text-sm"
                >12 labels.hours</span
            >
        </a>
        <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item">
            <i class="fas fa-file mr-2"></i> 3 labels.newReports
            <span class="float-right text-muted text-sm"
                >2 labels.days</span
            >
        </a>
        <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item dropdown-footer"
            >labels.seeAllNotification</a
        >
    </div>
</pf-dropdown>

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