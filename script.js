const app = new Vue({
    el: '#app',
    data: {
        currentLanguage: 'pt',
        selectedBands: 4,
        bands: [],
        positions: {
            3: [120, 180, 260],
            4: [120, 160, 200, 260],
            5: [120, 160, 190, 220, 260],
            6: [120, 150, 180, 210, 240, 260]
        },
        colorValues: {
            'Preto': 0,
            'Marrom': 1,
            'Vermelho': 2,
            'Laranja': 3,
            'Amarelo': 4,
            'Verde': 5,
            'Azul': 6,
            'Violeta': 7,
            'Cinza': 8,
            'Branco': 9,
            'Dourado': -1,
            'Prata': -2
        },
        colorCodes: {
            'Preto': '#000000',
            'Marrom': '#8B4513',
            'Vermelho': '#FF0000',
            'Laranja': '#FFA500',
            'Amarelo': '#FFFF00',
            'Verde': '#008000',
            'Azul': '#0000FF',
            'Violeta': '#8A2BE2',
            'Cinza': '#808080',
            'Branco': '#FFFFFF',
            'Dourado': '#FFD700',
            'Prata': '#C0C0C0'
        },
        toleranceValues: {
            'Marrom': 1,
            'Vermelho': 2,
            'Verde': 0.5,
            'Azul': 0.25,
            'Violeta': 0.1,
            'Cinza': 0.05,
            'Dourado': 5,
            'Prata': 10
        },
        targetValue: '',
        inverseResult: '',
        inverseResults: null,
        translations: {
            pt: {
                title: 'Calculadora de Resistores',
                subtitle: 'Selecione o número de faixas e as cores para calcular o valor do resistor',
                bandsLabel: 'Faixas',
                valueLabel: 'Valor',
                inverseCalculatorTitle: 'Calculadora Inversa',
                enterValue: 'Valor em Ohms',
                calculateButton: 'Calcular',
                toleranceLabel: 'Tolerância',
                pleaseEnterValidValue: 'Por favor, insira um valor válido',
                colors: {
                    'Preto': 'Preto',
                    'Marrom': 'Marrom',
                    'Vermelho': 'Vermelho',
                    'Laranja': 'Laranja',
                    'Amarelo': 'Amarelo',
                    'Verde': 'Verde',
                    'Azul': 'Azul',
                    'Violeta': 'Violeta',
                    'Cinza': 'Cinza',
                    'Branco': 'Branco',
                    'Dourado': 'Dourado',
                    'Prata': 'Prata'
                }
            },
            en: {
                title: 'Resistor Calculator',
                subtitle: 'Select the number of bands and colors to calculate the resistor value',
                bandsLabel: 'Bands',
                valueLabel: 'Value',
                inverseCalculatorTitle: 'Inverse Calculator',
                enterValue: 'Value in Ohms',
                calculateButton: 'Calculate',
                toleranceLabel: 'Tolerance',
                pleaseEnterValidValue: 'Please enter a valid value',
                colors: {
                    'Preto': 'Black',
                    'Marrom': 'Brown',
                    'Vermelho': 'Red',
                    'Laranja': 'Orange',
                    'Amarelo': 'Yellow',
                    'Verde': 'Green',
                    'Azul': 'Blue',
                    'Violeta': 'Violet',
                    'Cinza': 'Gray',
                    'Branco': 'White',
                    'Dourado': 'Gold',
                    'Prata': 'Silver'
                }
            },
            es: {
                title: 'Calculadora de Resistencias',
                subtitle: 'Seleccione el número de bandas y colores para calcular el valor de la resistencia',
                bandsLabel: 'Bandas',
                valueLabel: 'Valor',
                inverseCalculatorTitle: 'Calculadora Inversa',
                enterValue: 'Valor en Ohmios',
                calculateButton: 'Calcular',
                toleranceLabel: 'Tolerancia',
                pleaseEnterValidValue: 'Por favor, ingrese un valor válido',
                colors: {
                    'Preto': 'Negro',
                    'Marrom': 'Marrón',
                    'Vermelho': 'Rojo',
                    'Laranja': 'Naranja',
                    'Amarelo': 'Amarillo',
                    'Verde': 'Verde',
                    'Azul': 'Azul',
                    'Violeta': 'Violeta',
                    'Cinza': 'Gris',
                    'Branco': 'Blanco',
                    'Dourado': 'Dorado',
                    'Prata': 'Plateado'
                }
            }
        }
    },
    computed: {
        t() {
            return (key) => {
                return this.translations[this.currentLanguage][key] || key;
            };
        },
        displayBands() {
            const bandPaths = {
                3: [
                    "M180,35 L200,45 L200,105 L180,115 Z",
                    "M260,45 L280,45 L280,105 L260,105 Z",
                    "M420,35 L440,35 L440,115 L420,115 Z"
                ],
                4: [
                    "M180,35 L200,45 L200,105 L180,115 Z",
                    "M220,45 L240,45 L240,105 L220,105 Z",
                    "M260,45 L280,45 L280,105 L260,105 Z",
                    "M420,35 L440,35 L440,115 L420,115 Z"
                ],
                5: [
                    "M180,35 L200,45 L200,105 L180,115 Z",
                    "M220,45 L240,45 L240,105 L220,105 Z",
                    "M260,45 L280,45 L280,105 L260,105 Z",
                    "M300,45 L320,45 L320,105 L300,105 Z",
                    "M420,35 L440,35 L440,115 L420,115 Z"
                ],
                6: [
                    "M180,35 L200,45 L200,105 L180,115 Z",
                    "M220,45 L240,45 L240,105 L220,105 Z",
                    "M260,45 L280,45 L280,105 L260,105 Z",
                    "M300,45 L320,45 L320,105 L300,105 Z",
                    "M380,45 L400,45 L400,105 L380,105 Z",
                    "M420,35 L440,35 L440,115 L420,115 Z"
                ]
            };
            return this.bands.map((band, index) => ({
                path: bandPaths[this.selectedBands][index],
                color: this.colorCodes[band.color]
            }));
        },
        resistorValue() {
            if (this.bands.length < this.selectedBands) return '0';
            let value = '';
            for (let i = 0; i < this.selectedBands - 2; i++) {
                value += this.colorValues[this.bands[i].color];
            }
            let multiplierColor = this.bands[this.selectedBands - 2]?.color;
            let multiplierValue = this.colorValues[multiplierColor];
            if (multiplierValue === undefined) return '0';
            let multiplier = Math.pow(10, multiplierValue);
            let result = parseInt(value) * multiplier;
            return this.formatValue(result);
        },
        tolerance() {
            const band = this.bands[this.selectedBands - 1];
            return band ? (this.toleranceValues[band.color] || 0) : 0;
        }
    },
    methods: {
        initializeBands() {
            this.bands = Array(this.selectedBands).fill().map(() => ({
                color: 'Preto',
                showOptions: false
            }));
        },
        selectColor(band, color) {
            band.color = color;
            band.showOptions = false;
        },
        toggleColorOptions(band) {
            band.showOptions = !band.showOptions;
        },
        formatValue(value) {
            if (value >= 1000000) {
                return (value / 1000000) + 'M';
            } else if (value >= 1000) {
                return (value / 1000) + 'k';
            }
            return value.toString();
        },
        calculateInverse() {
            let value = parseFloat(this.targetValue);
            if (isNaN(value)) {
                alert(this.t('pleaseEnterValidValue'));
                this.inverseResults = null;
                return;
            }

            let allResults = [];
            for (let bandCount of [3,4,5,6]) {
                let result = this.calculateBandsForValue(value, bandCount);
                if (result) {
                    allResults.push({
                        bands: bandCount,
                        colors: result.colors,
                        tolerance: result.tolerance
                    });
                }
            }

            this.inverseResults = allResults;
        },
        calculateBandsForValue(value, bandCount) {
            let exponent = 0;
            let tempValue = value;
            while (tempValue >= 10) {
                tempValue /= 10;
                exponent++;
            }
            while (tempValue < 1 && tempValue > 0) {
                tempValue *= 10;
                exponent--;
            }
            let digits = Math.round(tempValue * Math.pow(10, bandCount - 2)).toString();
            let colors = [];
            for (let i = 0; i < bandCount - 2; i++) {
                let digit = parseInt(digits.charAt(i)) || 0;
                for (let [color, val] of Object.entries(this.colorValues)) {
                    if (val === digit) {
                        colors.push(color);
                        break;
                    }
                }
            }
            let multiplierExponent = exponent - (bandCount - 2);
            for (let [color, val] of Object.entries(this.colorValues)) {
                if (val === multiplierExponent) {
                    colors.push(color);
                    break;
                }
            }
            colors.push('Dourado');
            return {
                colors: colors,
                tolerance: 5
            };
        },
        getBandPath(totalBands, index) {
            const paths = {
                3: [
                    "M120,35 L140,45 L140,105 L120,115 Z",
                    "M180,45 L200,45 L200,105 L180,105 Z",
                    "M280,35 L300,35 L300,115 L280,115 Z"
                ],
                4: [
                    "M120,35 L140,45 L140,105 L120,115 Z",
                    "M160,45 L180,45 L180,105 L160,105 Z",
                    "M200,45 L220,45 L220,105 L200,105 Z",
                    "M280,35 L300,35 L300,115 L280,115 Z"
                ],
                5: [
                    "M120,35 L140,45 L140,105 L120,115 Z",
                    "M150,45 L170,45 L170,105 L150,105 Z",
                    "M180,45 L200,45 L200,105 L180,105 Z",
                    "M210,45 L230,45 L230,105 L210,105 Z",
                    "M280,35 L300,35 L300,115 L280,115 Z"
                ],
                6: [
                    "M120,35 L140,45 L140,105 L120,115 Z",
                    "M150,45 L170,45 L170,105 L150,105 Z",
                    "M180,45 L200,45 L200,105 L180,105 Z",
                    "M210,45 L230,45 L230,105 L210,105 Z",
                    "M260,45 L280,45 L280,105 L260,105 Z",
                    "M280,35 L300,35 L300,115 L280,115 Z"
                ]
            };
            return paths[totalBands][index];
        },
        changeLanguage(lang) {
            this.currentLanguage = lang;
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.bands.forEach(band => {
                    if (band.showOptions) {
                        band.showOptions = false;
                    }
                });
            }
        }
    },
    watch: {
        selectedBands: {
            immediate: true,
            handler() {
                this.initializeBands();
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    }
});
