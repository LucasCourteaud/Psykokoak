import path from 'path'
import fsPromises from 'fs/promises'
import * as fs from 'fs';

import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const filePath = path.resolve(__dirname, './client.json')
const data = fs.readFileSync(filePath, 'utf8')
const obj = JSON.parse(data)

//read the client.json file
const read_file = async () => {
    try {
        console.log(obj)
    } catch (err) {
        console.log(err);
    }
}

//get the client id in the client.json
const read_file_id = async () => {
    try {
        console.log(obj.Client.Id_client)
    } catch (err) {
        console.log(err);
    }
}

//Get the token for the specified service in arg
const read_file_token = async (service) => {
    try {
        console.log(obj.Client.token[0][service])
    } catch (err) {
        console.log(err);
    }
}

const replace_file_token = async (service, value) => {
    try {
        console.log(obj.Client.token[0][service])
        obj.Client.token[0][service] = value
        fsPromises.writeFile('./client.json', JSON.stringify(obj));
    } catch (err) {
        console.log(err);
    }
}

const replace_file_user_id = async (service, value) => {
    try {
        obj.Client.id_service[0][service] = value
        fsPromises.writeFile('./client.json', JSON.stringify(obj));
    } catch (err) {
        console.log(err);
    }
}

const replace_file_refresh_token = async (service, value) => {
    try {
        obj.Client.refresh_token[0][service] = value
        fsPromises.writeFile('./client.json', JSON.stringify(obj));
    } catch (err) {
        console.log(err);
    }
}

export { read_file, read_file_id, read_file_token, replace_file_token, replace_file_refresh_token, replace_file_user_id }