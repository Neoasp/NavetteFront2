import* as $ from 'jquery';
import { InnerOptions } from '../inner-options-interface';

export class ModalModule {

    private view: JQuery;
    private field: JQuery= $('input');
    


    public constructor(schedule : string, passenger : string, innerOptions?: InnerOptions) {
        this.loadview().then((view) => {
            this.view = $(view);
            console.log('okay guys, modal html is loaded');
            this.view.find('.inner-modal')
            .css('height', innerOptions ? innerOptions.height + 'px' : '300px')//fait appel à l'interface innerOptions pour définir le format de inner-modal
            .css('width', innerOptions ? innerOptions.width + 'px' : '300px');
            this.view.find('#modalPlaces').html(schedule);
            this.view.find('#passengers').html(passenger);
            let cost= parseInt(passenger) * 13.50;
            this.view.find('#cost').html(cost.toString() + ' €');

            $('body').append(this.view)//ajoute this.view au body lors de la resolution

        
            this.closeHandler();
            this.verifForm();

        });
    }

    private closeHandler(): void {
    $('button.close').on(
        'click',
        (event: any): void=> {
            this.view.remove();//remove view from DOM
        })
    }



    private loadview(): Promise<HTMLElement> {
        return new Promise<HTMLElement>((resolve, reject) => {
            $.get(
                'src/modules/modal/view/modal.html',
                (htmlContent: any) => {
                    resolve(htmlContent);
                }
            ).fail(() => reject('Ca marche pas!'));
        });
    }

    private verifForm(){
        $('#purchase-form').on(
            'change click',
            (event: any ): void => {
                
    if (($('#user-name').val() != '') && ($('#user-email').val() != '') && ($('#cgv-validation').is(':checked')))
    {   
        $('#submit').removeAttr('disabled')
 
    } else {
        
        $('#submit').attr('disabled', 'disabled');
    }
});

}

}