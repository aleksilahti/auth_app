const mongoose = require('mongoose');
const config = require('../config/database');

// GeoJSON pointSchema
const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

// Device Schema
const DeviceSchema = new mongoose.Schema({
    deviceId:{ // Id of the device. Used to query data from other db:s
        type: String,
        required: true
    },
    location: { // coordinate location of the device
        type: pointSchema,
        required: true
    },
    description: { // description of install (ceiling/wall/ground ect.)
        type: String,
        default: 'No description available'
    },
    image: { // picture of install
        type: Buffer
    },
    deviceType: { // type of device ex. 'Elsys ERS CO2'
        type: String,
        required: true
    },
    status: { //Install status planned/installed/online
        type: String,
        default: 'planned'
    },
    modified: {
        type: Date,
        default: Date.now
    },
    lastSeen: { // last time the device was confirmed online(future fuctionality)
        type: Date
    },
    addedByUser:{
        type: String,
        required: true
    }
});

const Device = module.exports = mongoose.model('Device', DeviceSchema);

module.exports.getDeviceById = function(id, callback){
    Device.findById(id, callback);
}
module.exports.getDevicesByType = function(deviceType, callback){
    const query = {deviceType: deviceType}
    Device.findAll(query, callback);
}

module.exports.getDevicesByUser = function(addedByUser, callback){
    const query = {addedByUser: addedByUser}
    Device.findAll(query, callback);
}

module.exports.addDevice = function(newDevice, callback){
    newUser.save(callback);
}