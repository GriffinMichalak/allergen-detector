"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const url = 'https://world.openfoodfacts.net/api/v2/product/3017624010701';
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Hello from Node.js backend!');
});
app.get('/product/:barcode', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const barcode = req.params.barcode;
    const url = `https://world.openfoodfacts.net/api/v2/product/${barcode}`;
    try {
        const response = yield axios_1.default.get(url);
        if (response.data.status === 0) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.json(response.data);
    }
    catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
