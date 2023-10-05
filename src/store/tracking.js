import {ref} from 'vue';
export const cart = ref({
    isOpen: false,
    setIsOpen(value) {
        this.isOpen = value;
    }
});