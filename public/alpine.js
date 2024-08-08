document.addEventListener("alpine:init", () => {
    Alpine.data('carCrud', () => ({
        cars: [],
        carForm: {
            color: '',
            make: '',
            model: '',
            reg_number: ''
        },
        isEditing: false,
        currentCarIndex: null,
        mostPopularMake: '',

        fetchCars() {
            axios.get('http://localhost:3000/cars')
                .then(response => {
                    this.cars = response.data;
                })
                .catch(error => {
                    console.error('Error fetching cars:', error);
                });
        },

        addCar() {
            axios.post('http://localhost:3000/cars', this.carForm)
                .then(response => {
                    this.cars.push(response.data);
                    this.resetForm();
                })
                .catch(error => {
                    console.error('Error adding car:', error);
                });
        },

        editCar(index) {
            this.isEditing = true;
            this.currentCarIndex = index;
            this.carForm = { ...this.cars[index] };
        },

        updateCar() {
            const reg_number = this.carForm.reg_number;

            axios.put(`http://localhost:3000/cars/${reg_number}`, this.carForm)
                .then(response => {
                    this.cars[this.currentCarIndex] = response.data;
                    this.resetForm();
                })
                .catch(error => {
                    console.error('Error updating car:', error);
                });
        },

        deleteCar(index) {
            const reg_number = this.cars[index].reg_number;

            axios.delete(`http://localhost:3000/cars/${reg_number}`)
                .then(() => {
                    this.cars.splice(index, 1);
                })
                .catch(error => {
                    console.error('Error deleting car:', error);
                });
        },

        getMostPopularMake() {
            axios.get('http://localhost:3000/cars/mostPopularMake')
                .then(response => {
                    this.mostPopularMake = response.data.mostPopularMake;
                })
                .catch(error => {
                    console.error('Error fetching most popular make:', error);
                });
        },

        resetForm() {
            this.carForm = { color: '', make: '', model: '', reg_number: '' };
            this.isEditing = false;
            this.currentCarIndex = null;
            this.mostPopularMake = '';
        }
    }));
});
