from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()

def get_gear(gear_name):
    exist = True
    data = {
        'name':gear_name,
        'status':'up',
        'management':'10.0.0.1',
        'nics':[
            {'name':'e0', 'status':'up', 'type':'l3', 'ip':'10.0.0.1'},
        ]
        # cpu
        # memory
        # disk
    }
    return {'exist':exist, 'data':data}
