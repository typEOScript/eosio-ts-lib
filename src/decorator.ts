import 'reflect-metadata'


const PARAM_TYPES = 'design:paramtypes';
const TYPE = 'design:type';
const RETURN_TYPE = 'design:returntype';

/**
 * ACTION tells the compiler this func is an action in EOSIO contract
 *
 * @param target
 * @param propertyKey
 * @param descriptor
 * @constructor
 */
export function ACTION(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // mark the func is an action
    target.prototype[propertyKey].isAction = true;
    // get the param types and save as a member
    target.prototype[propertyKey].paramTypes = Reflect.getMetadata(PARAM_TYPES, target, propertyKey);

    Object.seal(target.prototype[propertyKey]);
}

