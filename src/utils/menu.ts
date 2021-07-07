import {RouteRecordRaw} from "vue-router";

export interface Menu {
    title: string,
    index: string,
    icon?: string,
    children?: Menu[]
}

function getTitle(route: RouteRecordRaw) {
    let title: string = route.name as string
    if (route.meta && route.meta.title) {
        title = route.meta.title as string
    }
    return title;
}

function getIndex(route: RouteRecordRaw) {
    return route.path
}

function getIcon(route: RouteRecordRaw) {
    let icon = 'el-icon-menu'
    if (route.meta && route.meta.icon != '') {
        icon = route.meta.icon as string
    }
    return icon;
}

export function getMenuList(routes: RouteRecordRaw[], roles: string[]): Menu[] {
    let menuList: Menu[] = [];
    for (let route of routes) {
        if (isHidden(route)) {
            if (hasChildren(route)) {
                menuList=menuList.concat(getMenuList(route.children, roles))
            }
            continue;
        }
        if (!isAccessible(route, roles)) {
            continue;
        }
        let menu: Menu = {
            icon: getIcon(route),
            title: getTitle(route),
            index: getIndex(route)
        }
        if (hasChildren(route)) {
            menu.children = getMenuList(route.children, roles)
        }
        menuList.push(menu)
    }
    return menuList
}

function hasChildren(route: RouteRecordRaw): boolean {
    return route.children && route.children.length > 0
}

function isHidden(route: RouteRecordRaw): boolean {
    if (route.meta) {
        return route.meta.hidden as boolean
    } else {
        return false
    }
}

function isAccessible(route: RouteRecordRaw, roles: string[]): boolean {
    if (route.meta && route.meta.access) {
        if (containsAny(route.meta.access as string[], roles)) {
            return true;
        } else {
            return false;
        }
    }
    return true;
}

function containsAny(access: string[], userRoles: string[]): boolean {
    for (let role of userRoles) {
        if (access.indexOf(role) > -1) {
            return true;
        }
    }
    return false;
}
