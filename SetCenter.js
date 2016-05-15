var gb = {};

//--------------------------------------------------
//
//  SetCenter
//
//--------------------------------------------------
$(function(){

  var SetCenter = function($Wrap,$Target,mode) {

    this.$wrap = $Wrap;
    this.$target = $Target;

    this.W = this.$wrap.width();
    this.H = this.$wrap.height();
    this.targetW;
    this.targetH;
    this.targetDefW;
    this.targetDefH;
    this.ratioW;
    this.ratio;
    this.ml;
    this.mt;

    this.mode = mode || 0;

    this.init();
    this.run();

  }

  SetCenter.prototype = {

    setStyle:function() {

      this.$wrap.css({
        'overflow': 'hidden',
        'position': 'relative',
      });
      this.$target.css('position', 'absolute');

    },

    getDef:function() {

      this.targetDefW = this.$target.get(0).naturalWidth || this.$target.get(0).width || this.$target.width(),
      this.targetDefH = this.$target.get(0).naturalHeight || this.$target.get(0).height  || this.$target.height();

    },

    getSize:function() {

      this.W = this.$wrap.width();
      this.H = this.$wrap.height(); 

      this.ratioW = this.H / this.W;
      this.ratio = this.targetDefH / this.targetDefW,

      this.ml = - (this.targetDefW * (this.H / this.targetDefH)) / 2;
      this.mt = - (this.targetDefH * (this.W / this.targetDefW)) / 2;

    },

    setPos:function(){

        if (this.mode == 'cover' || this.mode == 0) {

          //--------------------------------------------------
          //  枠にピッタリになるように background-size cover
          //--------------------------------------------------

          if (this.ratioW > this.ratio) {

              this.$target
                .css({'height': this.H})
                .css({'margin-top': 0,'margin-left': this.ml,'top':0,'left':'50%','width':'auto'});

          } else if ( this.ratioW <= this.ratio) {

              this.$target
                .css({'width': this.W})
                .css({'margin-top': this.mt,'margin-left': 0,'top':'50%','left':0,'height':'auto'});

          }

        } else if (this.mode == 'contain' || this.mode == 1){

          //--------------------------------------------------
          //  枠内にピッタリ収まるように background-size contain
          //--------------------------------------------------

          if (this.ratioW < this.ratio) {

              this.$target
                .css({'height': this.H})
                .css({'margin-top': 0,'margin-left': this.ml,'top':0,'left':'50%','width':'auto'});

          } else if ( this.ratioW >= this.ratio) {

              this.$target
                .css({'width': this.W})
                .css({'margin-top': this.mt,'margin-left': 0,'top':'50%','left':0,'height':'auto'});

          }

        } 

    },

    init:function() {

      this.getDef();

    },

    run:function() {

      this.setStyle();
      this.getSize();
      this.setPos();

    }

  }

  // 公開api
  gb.SetCenter = SetCenter;

})
