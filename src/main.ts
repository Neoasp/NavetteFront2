import * as $ from'jquery'; // import jQuery module in Typescript
import * as moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');
/**
 * Main
 * @author Neoasp
 * @version 1.0.0
 * Entry point of our application
 */

export const currentDate: moment.Moment = moment();

export class Main {
    //constructor : methode appelée automatiquement lors de la création d'un nouvel objet new Main
    public constructor() {
        $.ajax ({
            url: 'http://worldclockapi.com/api/json/utc/now',
            method: 'get',
            dataType: 'json',
            success: (data:any) => {
                currentDate.set(data.currentDateTime);
                console.log(`Date du jour : ${currentDate.toString()}`);
                $('span#current-date').html(currentDate.format('D MMMM YYYY'))
                $('#app-loader').addClass('hidden');
            },
            error: (xhr: any, error: any) => {
                $('#app-loader').addClass('hidden')
            }
        });
        console.log ('Hello Typescript !');

        //remove loader
        // $ = requete jquery. on ajoute une classe 'hidden' à la classe 'app-loader'
        setTimeout(() => {
            $('#app-loader').addClass('hidden');
            },
            1500
        );

    

    }

}

//Bootstrapping of our app, création d'une instance de la classe Main
// fonction jquery, lorsque le document sera chargé, il déclenchera ce qui se passe entre les accolades
$ (document).ready(() => {
    console.log('Hi Jquery, document is ready and fully loaded...Run the App !');
});
const app: Main = new Main();
