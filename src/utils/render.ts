import { h, withDirectives } from 'vue';

export const hSlot = (slot: any, otherwise?: any) => {
    return slot !== void 0? slot() || otherwise : otherwise
}

export const hUniqueSlot = (slot: any, otherwise?: any) => {
    if (slot !== void 0) {
        const vnode = slot();
        if (vnode !== void 0 && vnode !== null) {
            return vnode.slice();
        }
    }

    return otherwise;
}