## VersaLink Mock Sensor device driver

This device driver is specifically designed to be used with the Agilatech® VersaLink IIoT System.

### Install
```
$> npm install versalink-mock-device
```
Install in the same directory in which versalink is installed.

### Design

This device driver is designed to simulate a general sensor device.  It does this by supplying a random float periodically which acts like a sensor parameter.


### Usage
This device driver is designed to be consumed by the Agilatech® VersaLink IIoT system.  As such, it is not really applicable or useful in other environments.

To use it in VersaLink, insert its object definition as an element in the devices array in the _devlist.json_ file.
```
{
  "name": "MOCK",
  "module": "@agilatech/versalink-mock-device",
  "options": {
    "devicePoll": 60000,
    "streamPeriod": 0
  }
}
```

#### Device config object
The device config object is an element in the devlist.json device configuration file.  It is used to tell the VersaLink system to load the device, as well as several operational parameters.  The mock device is simple enough to use a minimal configuration, but most real-world drivers will be have more complex config objects.

_name_ is simply the name given to the device.  This name can be used in queries and for other identifcation purposes.
_module_ is the name of the npm module. The module is expected to exist in this directory under the _node_modules_ directory.  If the module is not strictly an npm module, it must still be found under the node_modules directory.
_options_ is an object which defines all other operational parameters.  In general, any parameters may be defined in this object, and most modules will have many several.  The two which are a part of every VersaLink device are 'devicePoll' and 'streamPeriod', and are the only ones for mock.

```
"devicePoll":<period>
Period in milliseconds in which device will be polled

"streamPeriod":<period>
Period in milliseconds for broadcast of streaming values
```

#### devicePoll and streamPeriod
_devicePoll_ is given in milliseconds, and defines how often the device will be polled for new values.  This paramter is primary useful in sensors which sit idle waiting to be polled, and not for devices which supply values on their own schedule (i.e. for pull ranther that push).

_streamPeriod_ is also given in milliseconds, but is disabled if set to 0. 

These config options have little applicability for an event-based sensor such as this.  Since this mock sensor simply updates (pushes) the monitored variable periodically, it makes little sense to stream the value or poll the device for a new value.  Because of this, it is advisable to **set streamPeriod to 0**, which disables streaming, and set the devicePoll to some arbitrarily large value. Regardless of the setting of these config, the **value** will be updated as generated periodically.

#### module config 
Every module released by Agilatech includes configuration in a file named 'config.json' and we encourage any other publishers to also do the same.  The parameters in this file are considered defaults, since they are overriden by definitions appearing in the options object of the VersaLink devlist.json file.

The construction of the config.json mirrors that of the options object, which is simply a JSON object with key/value pairs.
Here is an example of an 'config.json' file which polls the device every hour and streams values every two hours:
```
{
    "devicePoll":3600000,
    "streamPeriod":7200000, 
}
```

#### Default values
If not specified in either the devlist.json or the config.json files, the program uses the following default values:
* _streamPeriod_ : 10000 (10,000ms or 10 seconds)
* _devicePoll_ : 1000 (1,000ms or 1 second)


### Properties
All drivers contain the following 4 core properties:
1. **state** : the current state of the device, containing either the value *chron-on* or *chron-off* 
to indicate whether the device is monitoring data isochronally (a predefinied uniform time period of device data query).
2. **id** : the unique id for this device.  This device id is used to subscribe to this device streams.
3. **name** : the given name for this device.
4. **type** : the given type category for this device,  (_sensor_, _actuator_, etc)


#### Monitored Properties
In the *on* state, the driver software monitors all values.  Since the mock device only has one value, only one is monitored.
1. **value** - The value is a random float between 0.0 and 99.9

  
#### Streaming Properties
For this mock device, it is usual to disable streaming.  However, if it is not disabled, while in the *on* state, the driver software continuously streams this value in isochronal fashion with a period defined by *streamPeriod*. Note that a *streamPeriod* of 0 disables streaming.
1. **value_stream**
  

### State
This device driver has a binary state: __on__ or __off__. When off, no parameter values are streamed or available, and no commands are accepted other than the _turn-on_ transition. When on, the device is operations and accepts all commands.  The initial state is _off_.
  
  
### Transitions
1. **turn-on** : Sets the device state to *on*. When on, the device is operational and accepts all commands. Values are streamed, and the device is polled periodically to keep monitored values up to date.

2. **turn-off** : Sets the device state to *off*, When off, no parameter values are streamed or available, and no commands are accepted other than the _turn-on_ transition.


### Compatibility

VersaLink will run on any small single board computer up to large cloud server which runs any of the following operating systems:
* 32 or 64-bit Linux
* Windows 7 and up
* macOS and OS X
* SunOS
* AIX


### Copyright
Copyright © 2018 Agilatech®. All Rights Reserved.
