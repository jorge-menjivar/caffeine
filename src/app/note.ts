// The Note
export const note: any = {
    currentValue: 0,

    setValue(value: number) {
        this.currentValue = value;
        console.log(this.currentValue);
    },

    core: {
        'plus': (currentVal: number, addend: number) => currentVal + addend,
        'minus': (currentVal: number, subtrahend: number) => currentVal - subtrahend
    },

    plugins: {},

    press(buttonName: string | number, newVal?: any) {
        const func = this.core[buttonName] || this.plugins[buttonName];
        this.setValue(func(this.currentValue, newVal));
    },

    register(plugin: { name: any; exec: any; }) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
