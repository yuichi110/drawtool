definition = {
    'width':1920,
    'height':1080,

    'gears':{
        'router01':{
            'size':100, 'color':'orange',
            'x':100, 'y':100,
            'left-nics':['e0'],
            'bottom-nics':[],
            'right-nics':[],
            'top-nics':[],
            'type':'cisco-ios', 'mgmt':'10.0.0.100',
            'user':'admin', 'password':'cisco123', 'enable':'cisco123'
        },

        'switch01':{
            'size':100, 'color':'blue',
            'x':300, 'y':300,
            'left-nics':['e0'],
            'bottom-nics':[],
            'right-nics':[],
            'top-nics':[],
            'type':'cisco-ios', 'mgmt':'10.0.0.100',
            'user':'admin', 'password':'cisco123', 'enable':'cisco123'
        },
    },

    'lines':[

    ],

    'texts':[

    ],

    'underObjects':[

    ],

    'overObjects':[

    ]
}

def check_topology_definition():
    None

check_topology_definition()
