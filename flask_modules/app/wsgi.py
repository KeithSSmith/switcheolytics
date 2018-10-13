""" index file for REST APIs using Flask """
import json
import time
import datetime
import os
from datetime import timezone
from flask import Flask, jsonify, make_response, send_from_directory, request
from flask_cors import CORS, cross_origin
from switcheo.switcheo_client import SwitcheoClient
from blockchain.neo.switcheo import SwitcheoSmartContract

app = Flask(__name__)
app.config.from_object(__name__)
cors = CORS(app, resources={r'/*': {"origins": '*'}})
CORS(app)

url_dict = {
    'main': 'https://api.switcheo.network',
    'test': 'https://test-api.switcheo.network',
}

rpc_hostname = os.environ['NEO_RPC_HOSTNAME']
rpc_port = os.environ['NEO_RPC_PORT']
rpc_tls = False
mongodb_protocol = 'mongodb'
mongodb_user = os.environ['MONGODB_USER']
mongodb_password = os.environ['MONGODB_PASSWORD']
mongodb_hostname = os.environ['MONGODB_HOSTNAME']
mongodb_port = os.environ['MONGODB_PORT']
mongodb_db = os.environ['MONGODB_DB']

ssc = SwitcheoSmartContract(rpc_hostname=rpc_hostname,
                            rpc_port=rpc_port,
                            rpc_tls=rpc_tls,
                            mongodb_protocol=mongodb_protocol,
                            mongodb_user=mongodb_user,
                            mongodb_password=mongodb_password,
                            mongodb_hostname=mongodb_hostname,
                            mongodb_port=mongodb_port,
                            mongodb_db=mongodb_db)

@app.errorhandler(404)
@cross_origin()
def not_found(error):
    """ error handler """
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/')
@cross_origin()
def index():
    """ static files serve """
    return send_from_directory('dist', 'index.html')


@app.route('/switcheo/balance')
@cross_origin()
def switcheo_balance():
    address = request.args.get('address', default=None, type=str)
    network = request.args.get('network', default='main', type=str)
    return get_switcheo_balance(network=network, address=address)


def get_switcheo_balance(network, address):
    sc = SwitcheoClient(api_url=url_dict[network])
    if address is None:
        return send_from_directory('dist', 'index.html')
    else:
        return str(json.dumps(sc.balance_by_contract(address)))


@app.route('/switcheo/status')
@cross_origin()
def switcheo_status():
    return get_switcheo_status()


def get_switcheo_status():
    status_dict = {
        'switcheo_status': ssc.is_trading_active()
    }
    return str(json.dumps(status_dict))


@app.route('/neo/blockheight')
@cross_origin()
def neo_block_height():
    return get_neo_height()


def get_neo_height():
    height_dict = {
        'neo_blockheight': ssc.get_neo_block_height()
    }
    return str(json.dumps(height_dict))


@app.route('/switcheo/ingested/blockheight')
@cross_origin()
def switcheo_block_height():
    return get_switcheo_height()


def get_switcheo_height():
    height_dict = {
        'switcheo_blockheight': ssc.ni.get_collection_count(collection='blocks') + 2000000
    }
    return str(json.dumps(height_dict))


@app.route('/switcheo/ingested/transactions')
@cross_origin()
def switcheo_transaction_height():
    return get_switcheo_transaction_height()


def get_switcheo_transaction_height():
    height_dict = {
        'switcheo_txn_height': ssc.ni.get_collection_count(collection='transactions')
    }
    return str(json.dumps(height_dict))


@app.route('/switcheo/ingested/fills')
@cross_origin()
def switcheo_fills_height():
    return get_switcheo_fills_height()


def get_switcheo_fills_height():
    height_dict = {
        'switcheo_fee_height': ssc.ni.get_collection_count(collection='fees')
    }
    return str(json.dumps(height_dict))


@app.route('/switcheo/fee/amount')
@cross_origin()
def switcheo_fee_amount():
    return get_switcheo_fee_amount()


def get_switcheo_fee_amount():
    fees_dict = {}
    time_dict = {}
    now_epoch = int(time.time())
    day_epoch = int((datetime.datetime.now() + datetime.timedelta(-1)).replace(tzinfo=timezone.utc).timestamp())
    time_dict['day_epoch'] = day_epoch
    week_epoch = int((datetime.datetime.now() + datetime.timedelta(-7)).replace(tzinfo=timezone.utc).timestamp())
    time_dict['week_epoch'] = week_epoch
    thirty_epoch = int((datetime.datetime.now() + datetime.timedelta(-30)).replace(tzinfo=timezone.utc).timestamp())
    time_dict['thirty_epoch'] = thirty_epoch
    sixty_epoch = int((datetime.datetime.now() + datetime.timedelta(-60)).replace(tzinfo=timezone.utc).timestamp())
    time_dict['sixty_epoch'] = sixty_epoch
    ninety_epoch = int((datetime.datetime.now() + datetime.timedelta(-90)).replace(tzinfo=timezone.utc).timestamp())
    time_dict['ninety_epoch'] = ninety_epoch
    august_epoch = int(datetime.datetime(2018, 8, 1).replace(tzinfo=timezone.utc).timestamp())
    time_dict['august_epoch'] = august_epoch
    january_epoch = int(datetime.datetime(2018, 1, 1).replace(tzinfo=timezone.utc).timestamp())
    time_dict['january_epoch'] = january_epoch

    for key in time_dict:
        fee_asset_dict = {}
        for fee_asset in ssc.ni.mongo_db['fees'].aggregate([
            {
                '$match': {
                    '$and': [
                        {'fee_amount': {'$ne': None}},
                        {'block_time': {'$gte': time_dict[key], '$lte': now_epoch}}
                    ]
                }
            }, {
                '$group': {
                    '_id': {'fee_asset_name': '$fee_asset_name'},
                    'total_fees': {
                        '$sum': '$fee_amount'
                    }
                }
            }
        ]):
            fee_asset_dict[fee_asset['_id']['fee_asset_name']] = fee_asset['total_fees']

        fees_dict[key] = fee_asset_dict

    return str(json.dumps(fees_dict))


@app.route('/switcheo/fee/count')
@cross_origin()
def switcheo_fee_count():
    return get_switcheo_fee_count()


def get_switcheo_fee_count():
    fees_dict = {}
    time_dict = {}
    now_epoch = int(time.time())
    day_epoch = int((datetime.datetime.now() + datetime.timedelta(-1)).replace(tzinfo=timezone.utc).timestamp())
    time_dict['day_epoch'] = day_epoch
    week_epoch = int((datetime.datetime.now() + datetime.timedelta(-7)).replace(tzinfo=timezone.utc).timestamp())
    time_dict['week_epoch'] = week_epoch
    thirty_epoch = int((datetime.datetime.now() + datetime.timedelta(-30)).replace(tzinfo=timezone.utc).timestamp())
    time_dict['thirty_epoch'] = thirty_epoch
    sixty_epoch = int((datetime.datetime.now() + datetime.timedelta(-60)).replace(tzinfo=timezone.utc).timestamp())
    time_dict['sixty_epoch'] = sixty_epoch
    ninety_epoch = int((datetime.datetime.now() + datetime.timedelta(-90)).replace(tzinfo=timezone.utc).timestamp())
    time_dict['ninety_epoch'] = ninety_epoch
    august_epoch = int(datetime.datetime(2018, 8, 1).replace(tzinfo=timezone.utc).timestamp())
    time_dict['august_epoch'] = august_epoch
    january_epoch = int(datetime.datetime(2018, 1, 1).replace(tzinfo=timezone.utc).timestamp())
    time_dict['january_epoch'] = january_epoch

    for key in time_dict:
        fee_asset_dict = {}
        for fee_asset in ssc.ni.mongo_db['fees'].aggregate([
            {
                '$match': {
                    '$and': [
                        {'fee_amount': {'$ne': None}},
                        {'block_time': {'$gte': time_dict[key], '$lte': now_epoch}}
                    ]
                }
            }, {
                '$group': {
                    '_id': {'fee_asset_name': '$fee_asset_name'},
                    'total_fee_count': {
                        '$sum': 1
                    }
                }
            }
        ]):
            fee_asset_dict[fee_asset['_id']['fee_asset_name']] = fee_asset['total_fee_count']

        fees_dict[key] = fee_asset_dict

    return str(json.dumps(fees_dict))


@app.route('/switcheo/fee/amount/graph')
@cross_origin()
def switcheo_fee_amount_graph():
    return get_switcheo_fee_amount_graph()


def get_switcheo_fee_amount_graph():
    fees_dict = {}

    for fee_asset_name in ssc.ni.mongo_db['fees'].distinct("fee_asset_name"):
        fees_dict[fee_asset_name] = []

    for fee_asset in ssc.ni.mongo_db['fees'].aggregate([
        {
            '$match': {
                '$and': [
                    {'fee_amount': {'$ne': None}},
                ]
            }
        }, {
            '$group': {
                '_id': {
                    'fee_asset_name': '$fee_asset_name',
                    'block_date': '$block_date'
                },
                'total_fee_amount': {
                    '$sum': '$fee_amount'
                }
            }
        }
    ]):
        fee_asset_dict = {
            'block_date': fee_asset['_id']['block_date'],
            'fee_amount': fee_asset['total_fee_amount'] / 100000000
        }
        fees_dict[fee_asset['_id']['fee_asset_name']].append(fee_asset_dict)

    for key in fees_dict.keys():
        if key is not None:
            fees_dict[key].sort(key=lambda coin: coin['block_date'])

    return str(json.dumps(fees_dict))


@app.route('/<path:path>')
@cross_origin()
def static_proxy(path):
    """ static folder serve """
    return send_from_directory('dist', 'index.html')


if __name__ == "__main__":
    app.run()
