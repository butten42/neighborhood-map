$('#iconModal').modal({
             show: true,
             backdrop: false
         });

         $('#leftButton').click(function(){
           $('#iconModal').modal('hide');
         });
         $('#rightButton').click(function(){
           $('#iconModal').modal('hide');
         });