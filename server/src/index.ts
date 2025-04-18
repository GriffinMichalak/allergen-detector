import express from 'express'
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
const url = 'https://world.openfoodfacts.net/api/v2/product/3017624010701';

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from Node.js backend!');
});

app.get('/product/:barcode', async (req, res): Promise<any> => {
    const barcode = req.params.barcode;
    const url = `https://world.openfoodfacts.net/api/v2/product/${barcode}`;

    try {
        const response = await axios.get(url);
        
        if (response.data.status === 0) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });