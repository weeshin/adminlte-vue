<template>

<dropdown hideArrow>
    <div slot="head">
        <image            
            fallbackSrc="assets/img/default-profile.png"
            class="user-image-small"
            :width="25"
            :height="25"
            alt="User Image"
            rounded
        ></image>
    </div>
    <div slot="body">
        <li class="user-header bg-primary">
            <image                
                fallbackSrc="assets/img/default-profile.png"
                class="user-image-big"
                alt="User Image"
                :width="90"
                :height="90"
                rounded
            ></image>

            <p>
                <span>Email: user@demo.com</span>
                <small>
                    <span>2024&nbsp;</span>
                    <span>Created Date</span>
                </small>
            </p>
        </li>
        <!-- Menu Body -->
        <li class="user-body">
            <div class="row">
                <div class="col-4 text-center">
                    <a href="#">Followers</a>
                </div>
                <div class="col-4 text-center">
                    <a href="#">Sales</a>
                </div>
                <div class="col-4 text-center">
                    <a href="#">Friends</a>
                </div>
            </div>
            <!-- /.row -->
        </li>
        <!-- Menu Footer-->
        <li class="user-footer">
            <router-link
                to="/profile"
                class="btn btn-default btn-flat"                
            >
                profile
            </router-link>
            <button                
                class="btn btn-default btn-flat float-right"
            >
                sign out
            </button>
        </li>
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

<!-- <script setup lang="ts">
// const authentication = {
//     photoURL: ''
// };

// const logout = async () => {
//     console.log('logout');
// };

// const isDropdownOpened = () => {
//     return false;
// };
</script> -->

<style scoped>
pf-dropdown {
    border: none;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    --pf-dropdown-menu-min-width: 280px;

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

.user-image-small {
    margin: 3px -4px 0 -4px;
    --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
}
.user-image-big {
    --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
    --pf-border: 3px solid #fff3;
}

.user-header {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 175px;
    padding: 10px;
    text-align: center;
    img {
        z-index: 5;
        height: 90px;
        width: 90px;
        border: 3px solid;
        border-color: transparent;
        border-color: rgba(255, 255, 255, 0.2);
    }
    p {
        z-index: 5;
        font-size: 17px;
        margin-top: 10px;
        small {
            display: block;
            font-size: 12px;
        }
    }
}

.user-body {
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    border-bottom: 1px solid #495057;
    border-top: 1px solid #dee2e6;
    padding: 15px;
    &::after {
        display: block;
        clear: both;
        content: '';
    }
}

.user-footer {
    background-color: #f8f9fa;
    padding: 10px;
    &::after {
        display: block;
        clear: both;
        content: '';
    }
    .btn-default {
        color: #6c757d;
    }
}

@media (min-width: 576px) {
    .user-body a {
        background: #ffffff !important;
        color: #495057 !important;
    }
}

@media (min-width: 576px) {
    .user-footer .btn-default:hover {
        background-color: #f8f9fa;
    }
}

</style>