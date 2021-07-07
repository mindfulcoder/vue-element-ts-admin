<template>
    <div class="header">
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">ElementPlus TS Admin</div>
        <div class="header-right">
            <div class="header-user-con">
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <div class="user-avatar">
                  <el-avatar shape="circle" fit="fill" icon="el-icon-user-solid" :src="userinfo.avatar"></el-avatar>
                </div>
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">{{userinfo.displayName}}<i class="el-icon-caret-bottom"></i></span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <a href="https://github.com/mindfulcoder/vue-element-ts-admin.git" target="_blank">
                                <el-dropdown-item>Github</el-dropdown-item>
                            </a>
                            <el-dropdown-item command="user">个人中心</el-dropdown-item>
                            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {getCurrentUser,clearUserinfo} from "../utils/user";

export default {
    setup() {
        const userinfo =getCurrentUser();
        const message = 2;
        const store = useStore();
        const collapse = computed(() => store.state.collapse);
        const collapseChange = () => {
            store.commit("handleCollapse", !collapse.value);
        };

        onMounted(() => {
            if (document.body.clientWidth < 1500) {
                collapseChange();
            }
        });

        const router = useRouter();
        const handleCommand = (command) => {
            if (command == "loginout") {
                clearUserinfo();
                router.push("/login");
            } else if (command == "user") {
                router.push("/user");
            }
        };

        return {
            userinfo,
            message,
            collapse,
            collapseChage: collapseChange,
            handleCommand,
        };
    },
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-bell,
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avatar {
    margin-left: 20px;
}
.user-avatar img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
</style>
