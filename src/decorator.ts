/**
 * action tells the compiler this func is an action in EOSIO contract
 *
 * @param target
 * @param propertyKey
 * @param descriptor
 * @constructor
 */

export function action(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // mark the func is an action
    target[propertyKey].isAction = true;
    Object.seal(target[propertyKey]);
}
