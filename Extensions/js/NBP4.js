
var CST_PARAM = {
    WIDTH_GRILLE : 7,
    HEIGHT_GRILLE : 6
}

var CST_TURN = {
    P_BEGIN : 1,
    P1 : 1, //ROUGE
    P2 : 2  //JAUNE
}

var CST_MOVE = {
    MOVE_P1 : 0,
    MOVE_P2 : 0
}

var g_oGrille = null;
var nTurn = CST_TURN.P_BEGIN;






function OGRILLE(){
    var _tabRow = new Array();

    Dessine();

    _tabRow.push(document.querySelectorAll('.row',document.getElementById('Main')));


    function Dessine(){
        //Objet DOM grille
        var oMain_tableDOM = document.getElementById('Main');
        oMain_tableDOM.classList.add('Main_table');

        var oCtnGrille = document.createElement('div');
        oCtnGrille.classList.add('Ctn-Grille');

        // Création de chaque ligne
        for (var i = 1; i <= CST_PARAM.HEIGHT_GRILLE; i++) {
            
            // On ajoute une ligne à la grille
            oCtnGrille.appendChild(GetDrawUneLigne(i));
            // _tabRow.push(GetDrawUneLigne(i));

        }

        oMain_tableDOM.appendChild(oCtnGrille);
    }

    function Check(param_nIdCase){
        if(!document.getElementById(param_nIdCase).bState){
            switch (nTurn) {
                case CST_TURN.P1 :
                // document.getElementById(param_nIdCase).style.backgroundColor = "red";
                document.getElementById(param_nIdCase).classList.add('p1-Check');
                NextPlayer();
                    break;
            
                case CST_TURN.P2 :
                // document.getElementById(param_nIdCase).style.backgroundColor = "yellow";
                document.getElementById(param_nIdCase).classList.add('p2-Check');
                NextPlayer();
                    break;
            }
        }
        
    }

    function ControlGravity(param_nColIndex, param_nRowIndex){

        var oUneCase = document.getElementById(param_nRowIndex + "-"+ param_nColIndex);
        var oDownCase = document.getElementById(param_nRowIndex+1 + "-"+ param_nColIndex);
        
        //Si la case selectionnée est la derniere
        switch(CST_PARAM.HEIGHT_GRILLE){
            case param_nRowIndex:
                Check(oUneCase.id);
                oUneCase.bState = true;
            break;

        }

        if(oDownCase.bState){
            Check(oUneCase.id);
            oUneCase.bState=true;
        }
        else if(param_nRowIndex < CST_PARAM.HEIGHT_GRILLE && param_nRowIndex >= 0){

            var nCaseActive = 0;
            for(var i = 0 ; i < CST_PARAM.HEIGHT_GRILLE ; i++){
                
                if(oDownCase != null && oDownCase.bState){
                    nCaseActive++;
                }

                param_nRowIndex = param_nRowIndex + 1;
                oDownCase = document.getElementById(param_nRowIndex + "-"+ param_nColIndex);

            }
            var sId = CST_PARAM.HEIGHT_GRILLE - nCaseActive + "-" + param_nColIndex;
            Check(sId);
            document.getElementById(sId).bState = true;

        }

    }


    this.Update = function(param_nIdCase){
        var oUneCase = document.getElementById(param_nIdCase);
        var _nColIndex = parseInt(param_nIdCase.split('-')[1]);
        var _nRowIndex = parseInt(param_nIdCase.split('-')[0]);

        //Vérification gravité
        ControlGravity(_nColIndex,_nRowIndex);
        


        // Check(param_nIdCase);
        // oUneCase.bState = true;
    }

    this.GetLesLignes = function(){
        return _tabRow;
    }

    //Retourne un objet Une ligne
    function GetDrawUneLigne(param_nRowIndice){
        //On créer un ligne
        var oUneLigne = document.createElement('div');
        oUneLigne.classList.add('row');

        // Création de chaque cases
        for (var i = 1; i <= CST_PARAM.WIDTH_GRILLE; i++) {
            
            var oUneCase = document.createElement('div');
            oUneCase.classList.add('col');
            oUneCase.bState = false;

            oUneCase.id = param_nRowIndice + "-" + i;
            oUneLigne.appendChild(oUneCase);

        }

        return oUneLigne;
    }




}





function NBInitialise(){
    g_oGrille = new OGRILLE();
    PutEvent();
}

//Gestion des tours
function NextPlayer(){
    switch (nTurn) {
        case CST_TURN.P1 :
            nTurn = CST_TURN.P2;
            break;
    
        case CST_TURN.P2 :
            nTurn = CST_TURN.P1;
            break;
    }
}


function PutEvent(){
    for (var i = 0; i < g_oGrille.GetLesLignes()[0].length ; i++) {
        
        for (var n = 0; n < g_oGrille.GetLesLignes()[0][i].childNodes.length ; n++) {
            var sIdCase = g_oGrille.GetLesLignes()[0][i].childNodes[n].id;
            var oUneCase = document.getElementById(sIdCase);
            oUneCase.onclick = function(){
                if(!this.bState){
                    g_oGrille.Update(this.id);
                    
                }
            }
            
        }
        
    }
}