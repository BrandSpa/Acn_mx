function ecommerce( customerId,  revenue, periodo, metodo){

    var tag = '',
        action = '',
        eventLabel = '';

        __gaTracker('ecommerce:addTransaction', {
          revenue:revenue,
          id: customerId,
          currency: 'MXN',
        });

        if(periodo == 'mensual') {
            action = 'DONATION_MONTHLY'; 
        }else{
            action = 'DONATION_UNIQUE';
        }

        if(metodo == 'payu') {
            tag = 'DONATION_PAYU';
        }else{ 

            if(metodo == 'oxxo'){
                tag = 'DONATION_OXXO';
            }else{
                tag = 'DONATION_BANK';
            }
        }
        var obj = {
            'id': customerId,                     // Transaction ID. Required.
            'name': action+' '+tag,           // Product name. Required.
            'category': 'Donation',         // Category or variation.
            'price': revenue,                 // Unit price.
            'quantity': '1'                   // Quantity.
        };
        
        __gaTracker('ecommerce:addItem', obj);

        __gaTracker('ecommerce:send');
}

function analyticsEvent(metodo, periodo, monto){
   
    var tag = '',
        action = '',
        eventLabel = '';

    if(metodo == 'payu'){

        if(periodo == 'mensual'){
            action = 'DONATION_MONTHLY'; 
        }else{
            action = 'DONATION_UNIQUE';
        }

        tag = 'DONATION_PAYU';

    }else{

        if(periodo == 'mensual'){

            if(metodo == 'oxxo'){
                action = 'DONATION_MONTHLY_OXXO';
                tag = 'DONATION_MONTHLY_OXXO';
            }else{
                action = 'DONATION_MONTHLY_BANK';
                tag = 'DONATION_MONTHLY_BANK';
            }

        }else{

            tag = 'DONATION_OTROSMEDIOS';
            if(metodo == 'oxxo'){
                action = 'DONATION_OXXO';
            }else{
                action = 'DONATION_BANK';
            }

        }

    }

    __gaTracker('send', 'event', 'DONATION', action, tag, monto);
        
}

function FB_Events ( _value ) {
    fbq('track', 'Purchase', {'value': _value ,'currency':'MXN'});
}

(function($){
    $(document).ready(function(){
        gadeclare = setInterval(function(){
            if('__gaTracker' in window){
                __gaTracker('require', 'ecommerce');
                console.log(__gaTracker);
                clearInterval(gadeclare);
            }
        }, 1000);
    })
})(jQuery)