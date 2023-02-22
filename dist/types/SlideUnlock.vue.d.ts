declare const _default: import("vue").DefineComponent<{
    autoWidth: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
    height: {
        type: NumberConstructor;
        default: number;
    };
    text: {
        type: StringConstructor;
        default: string;
    };
    successText: {
        type: StringConstructor;
        default: string;
    };
    circle: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    noanimate: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    Slider: {
        CanMove: boolean;
        IsComplete: boolean;
        StartPositionWindow: number;
        HandlerPosition: number;
        ProgressWidth: number;
        TextOpacity: number;
    };
    slideUnlockStyle: import("vue").ComputedRef<{
        width: string;
        height: string;
    }>;
    progressBarStyle: import("vue").ComputedRef<{
        width: string;
        height: string;
        borderRadius: string | number;
    }>;
    handlerStyle: import("vue").ComputedRef<{
        left: string;
        width: string;
        height: string;
    }>;
    message: import("vue").ComputedRef<string>;
    sliderWidth: import("vue").ComputedRef<number>;
    slideStart: (e: MouseEvent | TouchEvent) => void;
    slideMoving: (e: any) => void;
    slideFinish: (e: any) => void;
    reset: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    autoWidth: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
    height: {
        type: NumberConstructor;
        default: number;
    };
    text: {
        type: StringConstructor;
        default: string;
    };
    successText: {
        type: StringConstructor;
        default: string;
    };
    circle: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    noanimate: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    height: number;
    width: number;
    circle: boolean;
    text: string;
    disabled: boolean;
    autoWidth: boolean;
    successText: string;
    noanimate: boolean;
}>;
export default _default;
