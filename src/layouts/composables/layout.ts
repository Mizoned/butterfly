import { toRefs, reactive, computed, type Ref } from 'vue';

interface IlayoutConfig {
    ripple: boolean,
    darkTheme: boolean | string,
    inputStyle: string,
    menuMode: string,
    theme: string,
    scale: number,
    activeMenuItem: string | Ref<string>
}

const layoutConfig = reactive<IlayoutConfig>({
    ripple: true,
    darkTheme: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    theme: 'aura-light-green',
    scale: 14,
    activeMenuItem: ''
});

interface IlayoutState {
    staticMenuDesktopInactive: boolean,
    overlayMenuActive: boolean,
    profileSidebarVisible: boolean,
    configSidebarVisible: boolean,
    staticMenuMobileActive: boolean,
    menuHoverActive: boolean,
    activeMenuItem: string | Ref<string>
}

const layoutState = reactive<IlayoutState>({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
    activeMenuItem: ''
});

export function useLayout() {
    const setScale = (scale: number) => {
        layoutConfig.scale = scale;
    };

    const setActiveMenuItem = (item: Ref<string> | string) => {
        layoutConfig.activeMenuItem = typeof item === 'string' ? item : item.value;
    };

    const onMenuToggle = () => {
        if (layoutConfig.menuMode === 'overlay') {
            layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };

    const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);

    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    return { layoutConfig: toRefs(layoutConfig), layoutState: toRefs(layoutState), setScale, onMenuToggle, isSidebarActive, isDarkTheme, setActiveMenuItem };
}
