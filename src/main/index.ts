import { SetupServer } from './server';

try {
    const server = new SetupServer();
    server.init();
    server.start();
} catch (error) {
    console.error('Something went wrong...');
}