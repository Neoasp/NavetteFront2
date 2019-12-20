import * as $ from 'jquery';
import { ModalModule } from './../modules/modal/modal.module';
import {InnerOptions} from '../modules/inner-options-interface';
/**
 * PassengerChoiceComponent
 * @version 1.0.0
 * @author Neoasp
 * Manage passenger choice validation
 */


export class PassengerChoiceComponent {
    
    private readonly forms: JQuery = $('[genform]');
    private select: JQuery;
    private readonly okbutton: JQuery = $('[okbutton]');
    

    public constructor(){
        this.select = this.forms.find('select');//this.select recupère les select de tous les formulaires
        this.changeHandler();
        this.validation();
    }

    private changeHandler(): void {
        this.select.on(
            'change',
            (event: any ): void => {
                let target: JQuery= $ (event.target);
                let theForm :JQuery = target.parents('form');
                
                
                // emploi de children au lieu de déclarer le button, find aurait été possible
                // ou theForm.children('button').removeAttr('disabled');
                target.parent('[genform]').children('button').removeAttr('disabled');
                

                this.forms.each((index: number, element: HTMLElement) => {
                    if(!$(element).is(theForm)) {
                   $(element).children('button').attr('disabled', 'disabled');
                   $(element).find('option').removeAttr('selected');
                   $(element).find('option:first').prop('selected', true);//utilisation de .prop car selected est un état true or false

                }});
            }
        );
    }

    private validation(): void {
        this.okbutton.on(
            'click',
            (event: any): void => {
                const modalSettings: InnerOptions = {
                width: 500,
                height: 600
                };
                let target: JQuery= $ (event.target);
                let schedule= target.parents('.tour').find('[time]').html();
                let passenger= target.parents('.tour').find('option:selected').val().toString();
                let modalModule = new ModalModule(schedule, passenger, modalSettings);
                
                
                


            }

        )

    }

    
}
