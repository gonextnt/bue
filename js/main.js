let app = new Vue({
    el: '#app',
    data:
        {
            cards: [],
            newCardTitle: '',
            newCardItems: ['', '', ''],
            formErrors: []
        },
    methods: {
        addItem() {
            this.newCardItems.push('');
        },

        removeItem(index) {
            this.newCardItems.splice(index, 1);
            if (this.newCardItems.length === 0) {
                this.newCardItems.push('');
            }
        },

        createCard() {
            this.formErrors = [];

            const validItems = this.newCardItems.filter(item => item.trim() !== '');

            if (validItems.length < 3) {
                this.formErrors.push('Должно быть минимум три пункта');
                return;
            }

            if (validItems.length > 5) {
                this.formErrors.push('Не может быть более пяти пунктов');
                return;
            }

            this.cards.push({
                id: Date.now(),
                title: this.newCardTitle.trim() || 'Новая заметка',
                items: validItems.map(item => ({ text: item.trim(), completed: false })),
                column: 1,
                completedAt: null
            });

            this.saveCards();
            this.resetForm();
        },

        resetForm() {
            this.newCardTitle = '';
            this.newCardItems = ['', '', ''];
            this.formErrors = [];
        },

        saveCards() {
            localStorage.setItem('notes-cards', JSON.stringify(this.cards));
        },

        loadCards() {
            const savedCards = localStorage.getItem('notes-cards');
            if (savedCards) {
                this.cards = JSON.parse(savedCards);
            }
        },

        toggleItem(card, item) {
            if (!item.completed) {
                item.completed = true;

                const totalItems = card.items.length;
                const completedItems = card.items.filter(i => i.completed).length;
                const percentage = (completedItems / totalItems) * 100;

                if (card.column === 1 && percentage >= 50) {
                    card.column = 2;
                }
                if (card.column === 2 && percentage === 100) {
                    card.column = 3;
                    card.completedAt = new Date().toLocaleDateString('ru-Ru');
                }

                this.saveCards();
            }
        }
    },
    computed: {
        column1Cards() {
            return this.cards.filter(card => card.column === 1);
        },
        column2Cards() {
            return this.cards.filter(card => card.column === 2);
        },
        column3Cards() {
            return this.cards.filter(card => card.column === 3);
        }
    },
    mounted() {
        this.loadCards();
    }
})