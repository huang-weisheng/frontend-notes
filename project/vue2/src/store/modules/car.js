import { Message } from 'element-ui';
export default {
    namespaced : true ,
    state : {
        carNumber : 0,
    } ,
    getters : {
        carGetterNumber ( state , getters , rootState , rootGetter ) {
            return `carNumber=${state.carNumber}`;
        },
    } ,
    mutations : {
        ADD ( state , payload ) {
            state.carNumber += 1;
        },
    } ,
    actions : {} ,
    modules : {
        smallCar : {
            namespaced : true ,
            state : {
                smallCarNumber : 999 ,
            } ,
            mutations : {
                SMALL_CAR_ALERT ( state , payload ) {
                    state.smallCarNumber += 1;
                    Message.success(String(payload) );
                },
            } ,
            actions : {
                async SMALL_CAR_NUMBER_ADD ( context , payload ) {
                    console.log ( 0 );
                    await new Promise ( ( resolve , reject ) => {
                        setTimeout ( () => {
                            resolve ( 1 );
                        } , 2000 );
                    } ).then ( (res) => {
                        console.log ( res );
                        context.commit ( 'SMALL_CAR_ALERT' , res , { root : true } );
                    } );
                    console.log ( 2 );
                },
            } ,
        },
    },
};
