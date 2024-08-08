import assert from 'assert';
import axios from 'axios';

const server = 'http://localhost:3000'; 

describe('Most Popular Make Endpoint Test', function() {
    it('should return the most popular car make', async function() {
        try {
            const response = await axios.get(`${server}/cars/mostPopularMake`);
            const { mostPopularMake } = response.data;

            
            assert.equal(response.status, 200);
            assert.equal(typeof mostPopularMake, 'string');
            assert.notEqual(mostPopularMake, '');
        } catch (error) {
            console.error('Error during test:', error);
        }
    });

    it('should handle cases where there are no cars', async function() {
        try {
          
            const response = await axios.get(`${server}/cars/mostPopularMake`);
            const { mostPopularMake } = response.data;

            assert.equal(response.status, 200);
            assert.equal(mostPopularMake, ''); 
        } catch (error) {
            console.error('Error during test:', error);
        }
    });
//test

    
});
