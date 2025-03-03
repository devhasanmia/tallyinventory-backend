console.clear()
import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

async function main() {
    try {
        await mongoose.connect(config.database_url);
        console.log(`🎉 Database connected`);
        app.listen(config.port, () => {
            console.log(`🚀 Listening at http://localhost:${config.port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()