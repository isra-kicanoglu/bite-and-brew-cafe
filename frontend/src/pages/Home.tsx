import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './Home.css'; 

import { Search, UserCircle, ShoppingBag, Clock, Gift, Globe, Camera, MessageCircle, ChevronRight, Coffee, Star, Sparkles, Send, Quote, CheckCircle } from 'lucide-react';

const Home: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false); // Renk değişimi için state

  const sliderImages = [
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800", 
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800", 
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800"  
  ];

  const cakeImages = {
    raspberry: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGRgaGBcYGBgfGhcaGxcXGh0aHRoYHSggHRolGxcXITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLi0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgMEAAIHAQj/xAA/EAACAQIEBAQCCQMCBgIDAAABAhEAAwQSITEFBkFREyJhcTKBBxRCkaGxwdHwI1LhYvEVFiQzcpJDwhc0gv/EABoBAAMBAQEBAAAAAAAAAAAAAAIDBAEFAAb/xAAuEQABBAICAAUCBQUBAAAAAAABAAIDERIhBDETIkFRYRQyBRVxkbEjgaHw8dH/2gAMAwEAAhEDEQA/AHn6yBvXq40dBNV3Kz5t6v4SwCNqhCtKjW6zbCp7did6s5APesKn2oqKGwo1tAV5caPaplWN6Bcy4/KpVawik2GMyPDVPe45aTdqIYDHpdWVM1ym1hsRiXPhIXA0nYfeaa+QsBiLd64t9CigAzuCfSKxtk1Su5XFijYSHbCdwcvmI02HudKuKpHxN7DtUV7EWmEHWIYe42pGwvF72Kx7WQSqjzOG+yFjaOp0p/2aXNijMoJBqhZTzds60Av4HC41mV1cFejZl+Y70f8AACiQ7H7qBcw8Ys4eybroZmFYjXNGmtHgD2kCVzDbDS5/xz6N75uEYe4hXcK5IIHvBmqnLGAuYa6yXEh1OvX7j2pqx3MOM8BcWLdvIi5mthpZgfYb+lS8A43Y4kJtIEZQMzHuenrS3RD0VJ50sgp5RPxsoBYgVsuKBHl1pM+kTh2OsIHDh7PXLoV9x29ak5QvXWtAEGY61j2ADSUx5J2mW/ejc/KoBcZvhFWLWCH2jNWR0VRr0FKxTckp8ycpG+srq/SKHcB+iBnIbE3YHVE/Kad8Zxm1hTFxgGPQ9qK8B4uMRa8VdRJg05oodpR8x6XmC5bweGUImHQQN8oJPuTrQji/MmGwhK2soMSQo/ajy4ouxV1gd+9J/PXK2Ee27oxt3YJDSYJ7EEwaNpWlmq9UHx30qXT5baLpuSd6scJ+k/8ApAlPOd+1AOSuV8MVz40ku3/x9h8qd+FcicOAd1sMqsPts0AdwCdK88Ejyr3HdHG7+s2whnDOefHuhLxADTAHT3psxS4QYdhfYBWPU9SdK53i+UbAuu+FxBDIMyW/iLR+JFL3ML4uEN3bcLOvzFeYw15kzlzRlwMOgn2zygUxq3Euf9OVnNIkHt2+dCuZLipcuLmzhRKsPy0oVwLiWLxy/VbRywNZmABUnEOUcbYVi2UrGpBJP3GpZeO0uuk6Pw525TO2BQCzhuNW8AgAGo8zd+1OuHw0ASRpXJuB8TZC0hXVTXWOAP8AWcOLqEDTb2pj4teUKZkusSdBe3nCigOO4p0WqmOxdx3ZdoMGvMNYj1NTlUgFRCy76sYqxaw8bVYqS0veh7RVSreFWURGWsraWJus2l6Crtu3FI3NWIxqvKStvoR+tOPBbRNpC75mgSacx4Jpen4vhxNkyBv0CuiK2Y6EmtrZXYETSLz/AMZv2HRLa5vEIAjvO1PbXqoXX6JvwyEKXuuI6DsKoY/hlnEjMxbw+mTc/PtQ+5y7eu4fLiMSVMTCDQehJ3/CrPClxCAWbADWlXW4dTPYLXg2zsaVDnMiZcb7d8eyJ8LwtgWxbsHyrpKmdRvJ717zXfaxhXuJGZBmg9QN/wAKUZ4rhbt5/AD2SCVgrMnUnICTSu3M915tMSXuSpzGB5ukHavOkaw1SZBwZuVGZA7/ANVO99IOIhl8uu57DsKucKsY6xcOMOGdbd1ILTqB3ImRPrWnKnKj4XG+JjrWa0i5rceYM52+Y7HqRXTG5gS8DZa2yqVJObyyOwnejc8BSRwvIutLn2D+kx7flIzEGAD0H61FzJzityz/AFFVznDWx0Daj8jSxxzgU3X8JGCySBPTtTXyhwLCWUFzHWxckAjMMwQ7RFKdyWNrI96WSwGM0lPhHNV7CXldnF1IICdBPSPSiOGtu1+3iMO4i/dBawmkNM6jt1oxx3kDAvdN23e8G20f0h+OWdp7VPwPBYTC3hcso8qI8zk694O1BJyo2dlKaQDtdIv8Ga7bXxSpHVdfzqtjFw+GtyYEb0A4tza4WUll1kD4h2mOlHk4RZxli011XkqCdSJ02MUyORj9tT3NdgHXpAG5jtMHa3Jy/jVn6PuOJiLlwsfODAX0qtx/BYXCEeGpAuDLpMA/Og/JWAGGxly8xhSv5mlyvDQQjbC4gOIRP6VeWRfBvo2W4ogj+4eta/R7YxNzCC3Zy27ayC7CZPWB79aamTDYnXOSW1if0pT4pzccJd+rW0VUWhDwezpV8eJxtrG+b5RPiXL3EEjwby3J3zGI/PSlPmvgvFmElM8bC20n7qPtz/5CPKvSZoPZ+kW6MyiHk/F6egqgRA7CQ7nSsOJaLHxtAeC8ztbDG6wGQQVZfMx7elbcw8+NiAEupltCCEVviP8AqPahvEeG3+JY0/V0ADasToAe59aB8w8v4nCMUvIR2YGVNMGlC6ybTRw3i9yzdV7KpaF3yhmOb8+ldEHA+Gi07Xbge4w890scwJ7awo9AKSuT/o2TEYYXcTddWb/tqp+HsTO5pb4yt/BXWS5MKYk7N2pb3kdKzi8dkl5mqXWuUMLh8JbK2vPOvidSPWtOM8UOgLeUzBj4vSuecr8zXAr66MYPp7UW4zzAT4dlWDIpBnrNAXaVUXGGWthCv+VDisW3gsLS7sTtm9qaLGAvYS3ltXQGUjOvQjuKW8RgMfaDXwh8JiCSpEx3ijHAOY7Tl3uCWIjXrHSia4nSnngY0Zg6RQcbw73FzqoCjU6ak1JxFrQI8MiD0pT5nw1hou4bytuy9z7UX5V4Zcaw125uNge1IkFaIVTRE6MSNPxSIrbrfw61W8K98WkdpYFmgvPDFZVK7iHkxWVtKscJ/uF7xrnXNayZfMd/ShXL3ML2WLsxKf2zRPjPKjXCuXQitTyO2TLm1rCHXauj5PEbFhjo9ohytxx7+Kd1BCkbE/jRvm7lh8Ta8RrmUqVIjoJ1171X5N5WbDyWbU074vDm5YZBEkEa0+MECyuLz5mSSf0xQqki4TiTtet4TDsWAX+q51yqNNSeppmwvGLFo+GGUKDAg7nr+NImC4RieHvee6AQywrAyCdYHcUv8Q43mAUquaZDDcR0FNfP7IuJ+HeIzIrqo4hea5luNlOpQLsV6TVG/wACwnEL3iXEabOhIlczdjGpAj8a5w/Fz4bPcvGVhVUHWKCYbnfE2XYo+VW3Xce+vWha++wifxzGfK6j+y6FzZxazbdfBd1yyOpWR6HWguJ4ZjsVbs3hbyoR8TuJAP2yOgpUwl5L5DvfAYtOQyZEyf1psw/G8P4y2l8e/mH2yRbtga+UaSPesdppc5ZNyWQgNh2fUo1w7hqWrZt3ALrnU3J29B6VUwuDa0mR/wCpaZjkJ6dcs+lZiMaSYGlUuIcVW1bgvswIUnr3iuCC6bTvXpcsOfK/3JR48AN0hm8knSCJ+dUMXgbdhSrFXdtyDqvb5VLiMOMUvi4a8QywCNQpPUxVvlngF5bhOJyOpB03I9jXSi4haMf8rTDXZVfC8Vs4FUPgm6bhCtqJUdTrRvH8RZ7RTCqA2hgmMoOun7Uq4zlhfrrtcusMKoDCTqTPwz0/zR2/g8BcVzhrhW8q6Q5I0GxBNWsbgKVYZGAMbP8ACGcZw92/ctosGIzsfsmZo5zDw5ciFdyIMe1LXBLGKxAV0EJ9piYmm0eGtsKWDt6Gp5XUdqhxOgD17Jd4BwVrWLt3AxCaggn0q9zTyAcZeN21fVJ3BWfyNElw7MNdBVPPewzqUOe39odRQbb6aWCRwOTTRSTxX6P8XhkdnAuL0KHb1IOtScS4DgrFhJuMbxAJIOk+20V2SxjEvW/RhqKQL30XBrpb6yQkyBl1HpM1R41DyrIzFM6+Ro/A7Szw2+mBdGLsUcTmXf51rxfj4dGZj45YwikagU4cR+jK3dX/APZuZogfDlHyiubWcE2BxjJiBPh6r2cdCJrwks9p7DE7ysFla3uabxti2CbYXoJB0qnzDiMRiLAfwnNpd7kE69yak4vcXEMXCeZj8KiSfkKONxq6ltLL22tWo1UqRm+8V4ODTZVT43SM8NoARj6PPqmCw4uXLas7xLGCfbXYVT5y4hYxDFggRk1Uj7Q7GkrHcYzXDlECdB6UTxWOzWPhgt1jWqjRC4TC5stfKL4XnF2Q2i0W8uWPSKTcLiQt5svwzRvhHCLeRmdvMBKDv6Ux4HlG1es+Lc/psdfapxKI9uVvKiD9NUXK/DVxF8DNACyafL2KsWUKZpO1LfLnCUwiXLouZ2gx2iki9xi5cuGQRLfrQFwndpShpibRT1dyqN6rX8ciKcx16VtgPDyAtqai4rw0XV/tpasicGuBKVb/ABFixOasra5y+0nWsrKXX/MI/ZdyTDAb1OiDoK19zNeG+BVOgvmtlSloqjj3vMP6TZSO+xqvjOOW0MTmboq6mooxF74j4Kdh8R/alvIcKRtBBtFuK4VcXYNvOFZhr1g1zTj30eYhAWVkftEg/jTtieHAW8tt2VhqGnr60r3eMYvDPFw517NsR6GkSvx7H91dxXyMBEbtexXMsdwy+t9LNxCrOYBNHeMcmYNVW2uJY3ymYzlyAjcHTSun4jD4LiFtXdijLqCphlPvQu1yvwhWh3Nxid3uGPwgU1kzQOwse7xLzB/QBLHIeIw/D7L3HyXLx8qlRqR79qINxrx899mVLbKUa2IzA9DP41Y525PtqiNgbYAHxKp0IPXXrSdZ5cxj+VLJk6S2ij1NCZS51K+CDifTZXRrd/xSq2OZ7kfVmVVuM2UXT0HQkV13lrh2EtWxndLjtBuO4BLH9AO1K3APolw4AbF4gu++VGyqp99zRXHchYi3mGFxS+G0eS4CW7aMP2quNkYNtAXzDhRTVxHEYYIxBUEDcQIqpw25eKLFq4ytMvEAdjrqQfQVRw/LFmxbW5dvHEXLZBjQL6ApJmN9TuKebF7yrm0JjSdj2nqabSwOXO+IctPjHJv3LlmwGKBUXz3G76gwOm2tV2+j+xbuIlrF3reZcxS4qkkSARICwdRpRzmnnu1hy6J5nGg7TMH+elUOXefbVxwLrZCWIzMZ0mR2gHbTsKSSy6XVjh5QizDTij3BMFasKURvEC6GR5QR+tXv+H2WGYqiOeoUA/PafnVK7zlh2YJbHigmCwHkEGCcxEEDr7ik/ivNz+O1u8LbWh5SuYHq0k5NRoo06TrrWnEBTsikeeqTxb4YWSRdUn20/OhmK4ViQrFUUxOgaSfYUqYrGeICtvMlpXz23tswAMhShH2gdDHQkjoau/8AN+IRFVWBcHVyNCBIjL16a+1TyTQNHmO0l73RupbPxE2RDlrVzswgfjUA5lcTmO3rVXHcQfFXrYukM0qJyJ/TDETEjUwZ7DehXPnAvqOQpd8W2dJMBlPrGhBHWo2NE1ll18p8M7X9hFf+fVBiTRHHNg+IIvjLqNnUwfvFcmOItvoGAParODxrIQMxj0NF4Tm/aVSHM7/hdawNjBYJCbKgHq7an7zQvGc24a/Nu4quu0ECkXiGPLCMxiqGEsl2gUPhu7JRAi7TZY5Gwdy6Lgu5bO5Tr7T2q7xni2HsAWbNtWA02GlCBfNq34YOp3PaqAyDfU1pL3DZXqaDYTXwVcHehmthXH3Vtxq4tx8qmEXQAdaW7eK/tEVMt80YZf3IXd6RO2EQFZ+VRHCK2yADvUdnKPM1bPiyfQdqaGUgL1bsWVTbU1P4nc0LGMIofx7GN4LEGDRhtlLLqCOvcWfiFZXKv+LXO5rKq8Fik+oeu/4zjyqcolm6KupqO1hcRe1ut4Sf2j4j7mtMZi8Lg4tq6I7dXmT6zRbh+FDAXDcNydQenypBYR2nB49Frg8BbtD+mmv93U/OraYdj8Rq2KhxGJUbmK3EBZkSvTlFDeNJauWyrgencVpdxJecv3nahGJuMToc3qdqW9wIpNjabtK/EcE9nVScp/m1UGVWEjfqKO8RxCrq5k9B/ilfE4s5iwWBUJh9l0WzGto7wTmI2iEuSU/Kmzh/EzjLnh2lG076Ko6mkTgvBXxiPcVlRLZ8zNmPacqqCWIkdtxrTRguMLgrFuzYweLuG4zA3MhRnAMFgNSD0VT0E6zNUQcd570FHyZo712nDD8uIDNws46wcqj8yx+cVJxXg/i20TDXntG2yvoxh8rao5IJg67EfPaveIC4LYVGa0i5cz3PMWU/ERrIYdcwigVlr5NzDYO3ktKwL37jMVMgTLElmfQ6dNJiRV7Ims6Cge/IXaZb/B8OLYQgWwCjnwwFGYOGBmNfN+frSrzBeunE2rNkpqXJvXP/AIlWA8/6tVEjfOBQnmnC4zCW2xPjG9bEG4qM4A11OUkqQBppqBBjQmud2eer39UHzK4AhtdPNvO/2f8A1FG7pFxiQ+q7Thx3lm3bGe1ea+6t8DW9Lhn4fK2YLIjXfvSzjMO31xbIKqzsrQbboqlobL4Z80DaKCYFWvXVtIZLaeaYAAJJgdAATA7U8csYS/bzY1M1jD5VCAIDfxIGUFnclvBRjruBtAMSUNiyN0uxNzjA2ssjVf2VXmLEuqlL13LcUKsIsW8g0EnfcaACNaAYPiVm1dZyrXwQVCk5cxMCTEkCJ039adOaOebd6bNu0LgY5DnVTI1B3BMyBBA767Up8I4Dh2vB77smFysw1Ad2UkG2GjoRJIEwy95o3R1tSQ8syDADfwj3CMavgKUIygFgszlkscpJJ2Ht7CYqefJIiQB8p0kz/Jihj/1XKYWybVogZZIgqphj5tcx02I696H4njTWZVjrpljRiD19NK48nEeX23dlR8vjSRuyf6pw4Pw0EtduI7W7I8R1VWLXCJIUEQJnr0En1B+3xDDm5YxCZXtnytbdg5VnK/3TlKmNQT1GnVJ4HzPcW35bptkBogiJOxYEbgAge9Scr4F715sSbJbDC5JVFDZmaJCWx5oDNuBoAe1dKGAxNA9T2t4pjDXZmtfv8LovMqYbwStzDWblp/gCoBr6MBo3rpXHOZuAJaAvYZ2Nhmywx89ttTkPcQNDXT8Dwzxme4vjYJbTm2gMFX80llDwR6jrpFKvNdlfCe4LyXfGMf0/gm2wGoMENodPenPB7TIhE4UDtc+zP3ohw+4y9a0WzUypUziCnNbSne7PWa2trWlhe9SrrS6TbUtomYFXLbxoNT3qqoit0xFvwyZJYmFUb+5ohpEyF0ppqtI3zP5VKE9darYOy4bK4gkT8qJKirufeitLfC5rsSovq81XxvD5QjeaK2HUiVIIqpj8coTyEEmtBSy2uwkK9wJ8xrKPHCXW171lOzKm8MeyuYnjhKXLmJNm9dS6BaLh0JEAmLMaj/yps5H5xt5VsXSReeXC+GUVQT8In75rkF/F2HuPcZLst/2xnnKZ1LOwlvarfDMdeu4y03iMbjOgLdxI0gdIG1NeNJDDtfQRxrv8CwP7m/QVocMDucx7nYVaygDzHaqdzEE6Ip/8jt/mpCfdWAey0voFHmO33UC4lcuk5UED+40ZfAH4nzMd9QYHyoNj8ZJKICx9NhSnFPjCX8VhlWSTmbuaAYwF5CD59KabvDSfNcM/6RtVDFYeOkegoQnFHuBXLn1SymFu4XBZixi9nN28bTSzkiDkMbdttIplN+9h0uX8RiGvMzFbdpFW2qgkfCjeckDU5idj8I1rmfDsZ4Fx3VgHBQ3XYv4yWBkYpat5T/TgAl5g+J/pmobPHHe62IwX1iT5GbE3LbLaa5qHtlgBmgRrqAexNdNp0uK8U4pwvJfvu/1nFM31cg+HhA63A51lg6mVC7gSDPpqA4zzyX8S1bINpmcnLKlmJIkwT1E+vtpXvKfFLtzF4rEK3h3wmUs5RLNxohcwEnO2Ut5c2lGODcMwnCkS9fi/jLhzZdwjMTOWYygMR5oLHXYbDILHdKvgnGW8cvj5S22Nx7o1sWL5lVBGW7rlGuh3YzsNTP3lOWMdh7V1bNvC20aVJNxTKgAFpnWdQNRPUkdGHFcxWzle5ilggnLbt3FytIADZbqyDpv26UG5uxC3bdy6gQuttYKT4i25B1I0KeWIJJBBg7gLGhoq94Mjxm2gf1/0ohiMbwyxifHGC1IcC6j6nNmz/wBOQuk/Fvr6Un82cati262bjpnAco5JuZzkUs7MDIyjKonQZYAAihNq/fxLh7dtrhtquiLIRUGkxoBp86tXeAAkX8QhvXrykJhwWtsrE6Mx6rJA1IAnrWxPcTvpJ53FhijGLrd+qD4PmhkNtnAc2kKWwekkmdOuv+9EeRuBfXGZ711reHQmSILE6Eqs6CSZmDUNvlSzlYv4zPmIy2QGVMpI0cZluEkbBjE66xI/wcRhVFq6HQOMyg7MsnptoZkdKZJ0peALl+6vlO+PwHD5KYVsaSCUW6Dba0GaPKYUEjQyQfXWlbinDVaxItFb6PkEGWuECGVhADNIYqyiYEGd614fzFcsghSIIiD06fpT5yhi7K4c37zWyWc6ZAXPqWJMCdzlnWlMO1fzI/LRN/5K5he4Vj7anNhMQoAkk2bkAbyTliPWr3KmMRIUYq7hXzAs8Z1MaQLYgjfck7Gu2YTi6pma9dtE2oZgpYNJUBUhwFP2vMIO22ornv0rcLFyb6ogZZYmyq/1VuFMrPABLDYnU+Yepp+S5LoXAWvU4hfvHwsTxAW7SXFyN4TM16SWnLOW3uPiJ1j5x8W4zhlFzDWspCudD1mF8olgrD4swaWG4pU4pzVdvYW1hWVUFpgbZUZcq7GerSdSZ1I70PsX8pb+oAyu7i95pf7PlkazJMQPevEWEppINhNq4L0rf6mBRHDAm2hgjyidI6duntW9vDMdelc+qXXyBQoYWtbYt+IqPdVFKkl5kAjZdNz6V7xrjVy0WGHysyqRcBWcoP2tdKAWuLea2LbqiW8xhxmGdgczCB91UxxCrKjm5BBpqNNi7QQtKl5IWyCZdY+Msdh6VphLAZgqFS5AgqfLmInLPcCgVjE3bRuMoTOyFX6nLuWBOxM1ph+MaZFHhoMxtmdUY7tI3P70b4muFLIOZLC7JpTFhuJXFuFWhmmD1MjpNWcXi0yz5h0YTvQG3de3AbLmgajqN5J71axB8VFVE8y7n+6o3xgOpfSxzeLC2d1X60imOYNlFgxAlgNq24Mys3mI0FB7GBuDeVnSjPB+GFNN/wBKxJ5E7PDwG7Rw3h0UV5UgCjQjWsr21zaHsuMm6TvT39GtvJd8UBSxGVS32e596RhYM7Gnbk6w6nQT77CrJT5Vz4W+bYXYMJakZnYk9zt8hVXifMK2CAOsiIliemxhRVC5afwGYlmYKSOgHsOtc8x2NMZFj/U53Pz7VNdLscPjsksu9E5vzywIFy41uCfKoBOWOpOhM66dqis86WLl0W8h8xgXdBJPdelc0xV7/epOCIXv21UZjmGnsd6w2RtVyQwC6C6xiyBPU9hQTFWydDp6CjnhnfYfnVPEWwDPWkEqBoVH6SuNLkt3MKrpftqEF22Yy2yBIYR5hGg/tn3rmOJ4/ebDph/KER/EGVQGL6gsxGpPrvXVuHg+Pan4fESf/YUP+kPl/Ctea5mIdjOVSIn17a0+LkYjFykm4wLvIk3lZXXFYU3HBTPnyyTJVS4BUbklAIjTTpTFx3Frduq7W8gglskzIkZQZIJzDU67VU4ZyjktPjRc0sgmO5IIjTtM+u1DeIXZ0zBlBlNN1JJka7STTnvDxpVfh48Ik+qlvYtBcOU5rehyk6HuNav3eMYVEuqtsstwlVbMfERCB5CdiPMwByzpuaWnuSZ9B0qnib/615gVHImBbsonwrjNm1fsybrYdGz3LcgZmXMUiOxZd/WD2n4Y+Gu3nZ718C6zpbtjV9syh3EkqWyrAIY9+6nbub6DX0nrOnY+oohhUc3UZURGYh7bE5La5CSWGYxlldzOxqoL55xs2m/imIxdnDi3hLGIsWixLErbUknyhVCEsJIJ3k9NKzgmJt40WsGcIDdi42Z3u5gCFE2yWyq0jNJEeWOtC+W+KpZzNiVF4O6uEb4SQRNxiNYGXQDfWZGlN/FeI4G/ZuFMRcbFZH8DLCrbXKW8OAAMkAg67zEbV5ZaTOc+WvqV82/GL+bYoylQQCDqSDvEz066xd4Xi8IEYXVuPlgp54hiRtA0EA7jr6UNOOW9auHEtdDrbBtakhmmZbMZOad+gjfah2CuDsAe/wDj3j7qW4K2CS+yna1xLDXbn9VGfMwgLccKANNJli0GBJjfSiVlgq3beQ3Bem1bJY5gIbKU2E5ftD+0Uj27u4yrKyZjU9tfx++i9viBZRcu5iEjLrA6LH3AbdqVa6Abk34ShediCrSSpyiZ0AJkAnbU7U9fRzhhcxC3bzZjaSLakDQKIE94Bq/y9ydhsaVJveG6gl1RAA0mScxJ7xMU08F5SwmGuF7bXGcTGZlIAI9APvoORL5aBpc+OIB29r3ikPcdl+0Z/CqFvBtOtGzZHRT79P3r17UdNaAWAnaXHedeFvZvswByPqD09RS5PSJPeutcz8NuXlKa+grnmP5Zv2tWED8apifYoqSeKjYQu5lK+UNnBOYzpl/erN2+GZXuIuQgCFMGF0+RPeoLGBuP8KE/rRjD8v3kUm4jBGgHykTHSTTS4BIDCVJy3w9mcyAbR80TJHaT7U54fBWk127UB4NilsjIggde5PqaL28UbhjSe/QVHKSTa6UFNZjasXsZbSS5AA0mJA9vWqN7mRVa0UZQh1cr5nVekiNCaq8yYzw0UW2yvqwbSDGhGvWDSrYxThwoi20ZQWEHKw1JpsLBVlT8iU5Ygp2w/Eb7KGRbRU6qXchiDtIjQxXlJ9s2wIZbjEdVeAR0gdBEVlOxHspc3e6e7PKyTJEn0ph4VwQjYR61axvEsLhELXLyDKQGXVmntC6z6Uo8U52xTKuJtnDrbDMEwga4br+ZrYa4sQYIzZPSpmQudsq2TkNbpqfMZxDD4VJv3lQRpm3b0VQCT8hXLeaArKMRZtuLNwnK2VguaSCNRoZB09Knt4+9isNeucQuKASwtyuH8TOphraLeErbAVScpBzA6k6ATjuLJimsL4t+4yIA0iyiLcMAJbAygJmAEsTptTfCFJcfKex1hAbl8U08i4m3adnIzXDov+kdfnW6cvJdCsBAdcwEiYmDsehBFGOF8tKupEKNz0++kOcOlcXvdsnSYkx+fRRJ/AVpiSltc11o9J/IUNu8ZRP6WGXO393QfzvWmH4UXOe8xuP2+yp/X8qTisyUVzG3r3/YUon95mT7f4rbiHDGPmLZrnWev7e1MNrDkiOnfYD/ABUOJe2k5fMe/Qn9axzAQvNeQVJyDgLd6xibNwSGZZHpl09jIOvpQXG/RwFMpiYSSQjWwzCZkZgw09xVi0twMWtMwdh5iIC/P1FB8ZiMUu9w6UOTmigtDbcSCsu/R9mMLeb1mIH4bUi83cBv4O8bd0HL9i4Acjj0PfuN66By5xhvHVLrkqSI7T0Bpmv8zeJdNm2CdYnKf1Eb0yKcs+7aTOxztBcCweHe4627al3YwqqJJPsKYeJ8n46wM92wYy6lHR4/8shJ0iupcW44uFYhVTOQAzBFDE9pA1g0qXObMQbmbNp/b394o/q3OPlalt4evMVzeZmD7CrVqzKEqHzD4SIyQFZnBJ+1AmAe+ldKuYbh+KIa7hvO4g3EdlIaP7QYn1Iaht7ljCYdvGzu4BlLbFSJ9SBr0+6nfVMr5SfpX2lexaxGJVFNq64trC5UJ0J9BrqRVfinD/AOpZWzEFHUqwjrr91Mf/F7gfOkJ6KIH3U38B5ua6RbvAMRqCwBjTpO2nagPJrbgnjjkfaUk8q8CfES5lLQGrHr8/2o3a4bgX/pm44MyWB3g7QdKtc18wviHyqTkGnv/DQfBcOLnT5k1M6RzjYNKtum0V0vCLYsYdjYUJIyzMk+5PrQfCYPViGYZtCQd+9R4K2LaBdXHqetWCxJEeU+xisDCduQXXSJYW/ctQoKXB0BlW9s2xq03ErebKwNszrmED/22oLaw7jK0Qi6li4n3URQzjHG7mJJsYcZhGVrh2H7mqG2p3AXpMeP5mwaeW2M79AoJJpUxVrx38S/oPs2x+pqSxglsrA8zx5m/T/AqRRsDoTtp/PurC8nSY2No2VvwPmDC2yQqDOpIkjcdl7VS4o2FvXs7Bs3xeRyIafiGsZtKRuPZrd51nSSVjsdd6qWOLODNdBhGK5kgORtPPFbnjurFQB8JYbnsT3NWrXDDAC6L69fehPL2Oa+yqVAVSCT7dzTgYbyp1OrVLyD5tK3jfZtJ/OmFU2woHnTWZ09aQ2xDSZ1PWddq7NjMNhv+3eJUATuMzTtt7bVUv2rfhhfq1vKToITNlJ0kbgeu9YyTEUqfy6SY31+q5Bm96yul3uV8KSSLI17OQPumspnjNS/yqb3H7oFxG5gMTdu3nL4dF8zKDnuYi7cJZioPltqNfSMvcmoMPwdLH/VYhHNhhmtWzetrefMRlZgCGjWdAJkHbcVx7FsX8MqiiyPDCqqj4dJZh8bafESZ+dVcVefMTnzkLBbzEQVyx5wDpMfl3py5qsIiOZW4wuNci3bgkKDB81xiNixXQalSdBvNbxDwt1il10MG3czPKrAUsuXKEU5VALa7REzQxF1Gg5ApELlWcpAX4iTJzE6nvOkV60FptmJUEyQNYGYDuJ6dvavLExcqcYtWb6O1ss0ONCFWGWQPDC9HB2MajTu4PZv4ohrzeFbO1sDzR3PRR7yfSqPInL+RRiGWLjr5Vj4QeuuoLD7gek09myIGdoHULEn3ipJHW7SviaWt2h+E4SFCpaUQdwB+JO5+Zog5t2gAxDMPsqdB7mormPJXJbUqNoG59z0+8VBZ4eRGfTsi+vU6an1NKJ9k0D3WmLvu5A0jon2fc94rX6mFBNySfz/AMUTNuBER7b/ADP7UMxN4LMa1hRA+gVa/iDEABRQjE3wPX361NjMR1JoLiCW1G209aGrRVSgxdsHVT8uo/neiGD5rvW9PKSdM5BzD13ifWhN5su2/eqOIvCJIg17w7WOd7olxC4WMkzQ2da9s4wMsSDULvrRBlaQ52ifD7ZZlUGJNW+YL4zBF2Ufw1HwJwCWPQaVWcG45/M9KCt2iLrUGEw5cwP9vWiJKr5E1PVup9B2FY4QAKjadSPtH9q9RgNq2iVlqbCYYbmP0oojeWI37RQgPUq4qNtaIMpYXIxbxAUe+npRFeILYQtddR2Tr+FK+I4kLenxXDsAJiqqI1xg+IYmD5U3A9xG9MDa2Uouy0Ebe/fxp8xNrD7wBDOPTsPWiKgDLbtLkQDpuT/OpoZZultToBp1j8PiPoKIW7oA+6Sdf9z6DShcbTGNAUlpB0MnXrr7z2/1VrcVQCZ0jU9oEnL/AKQNSaXeauIYi2F8GAjK5ckrPkhtS0ax270v3cfiroK3bqFLo8a6TmK24DBc+RdDtCid0FGyHIXaB8+LqpG+M8BW9DhviEoV2YdxH2aCLyuytrrH4e9GTxULke8yK1qz/RFrM0PdAhXckTcJzOTJAykVGOY8zLachDa8txTBa9c82ZlIH+mANyWG+1NDHt6KS50bjsbWnDrDAlUEDr0pnssRbJGYCIkR8yflNVsSVVQQPJOmXUsfTue/QVSu33KlnhUEArm0C9R6nuaQTasgaA8KzdxyE3Ht25kAFmbzSBJgHcaihNu8QZJ0Igx0nYGqS4kMx1CqOg9egrdF0eG6H5wfzoCF9DG8BFhigNBcMD0FZVaxh/KIujb+2sraXjIP9/4kXGYJ7ZKujIQSPMpGo96iNdm4lgsGLim4jYpzJZ7rMVUbwCCLax2C9ImaHYzhXD7mecKibQ1kvp6mCAPmNfWKr8UL5Yfh8pFhcsDw2bKu85Yld9oM6ehq9wZR4yGAFBBJOoERPuTrp6/Oi3E+VDaHiIwvW+4+Jd/iHUQPiGneKrYSwZAA+QrS8EaU/guY6nBP9rmNyP6YCjbOTr937ffV/DM0ayWbXXcjvl7ajc+pFL/L2CaRC6942HudvwHeuicMwCouYxJ69vn/AA+tTEWVVlQUeD4ewE/B3/uPy6VbcBBP+SfnUd3iMiLcGOvQVSxWIVNXOpEwNz6wdh3J0rDQXhZ7UGOxTn4RFBsTiOg8x200HzNXLge5sMidY1kdv591afVAAYEDqep9+3tSiU8CkEuWe8k9v50qriEjffsKLYhD9kfv9xqldsx0PzrwtaSEHv2idxFU7uG9KNNb+/r2FQ3bf8/xTWpLkt3eHzrtWv1I/wBxo49jvU64AKM1w5VjN6ken86inZJYjyNBUeF8LuNqGgevX7gTUj4bJ8Wu/UkSPer2K4lbVQtn4dBrqTpMz95ioPrRYBDrPQn8ZNASq28YY/KqF6zxKiutBIrSREtoK8G2pnODVYDknStHxxEpbierdB8+/oKrXLrMInKn4n9hWwgLM5VH4fzvRhvskl1nzKWxC6ySx3J/n4VaW+F1Mz2/f09BVVFj9D+371r4TH+fyaAje05tVpXRjyTudNumn36D0FFsNi4gnTt00/8AqD3oKlnLrv8AiB+5/Ct0J+1qTsgMye5/f/ehxtFlSE848T8Vxb1/pkgETlKsFOx6yPwoUMTAcW/LbLL5GYFj7wASJ1+7rrRXmGwAwcf92QTEQBGg232oHiLxYy2+gnQaKoUCB2AFVR1iAFBITkSVfOIRVPhzBITJcAc6jzXVkZQ0ggCJGbQ9atSyq7G0qLH/AE7FhNs27oYqh3ZyzwZnrrAoThLebyhDcZgVUANOY7RB1Ijb3qzwu5bY2kueIwl/Kp2lfKB2PiEEnajQLoPL9h2txdGR0gFZlpM6QPhJILH/AMp61a4jwwuh6fkPSrfBcEtpImSdbjnUu0CST1J7UUZxoduqqe0/ER1PaoHG3WF0mW1oB7XKcfgbto5WQx0joPXtXmHclgoDR1Gv5xXR7uCLgncHWT69/wAqgThUCAAJ3PU1pd8Khk729FKdy006NA7dtKym4cJH8j9a8rFv1MnulP8A4sbhkyyqAAgzQO3w6wIrReIicwJkkTOse06j5960uYRbKOuYFyRpGixOxnfUUKF8gxMz/NaYGprpvZMlnirKYLFlAPxHcdVH87UawPBAACRlG8aTr+VJWBYF1UnSRPt1/Cuj2cWrAEt/B2Hb1rHCkieQOpWrBVIVRPYan+fOr1qwzFi7wqiW1MKPWDqfT0ql9bVQPXp9oz3PQfzWlP8A/ILWmdQuzOPY5j6axt7CijZkdqKV+A0nZcZbuYdr+HuBlUkSylTI3yhuvaah4dYS6PELZ+u56gGTP5mfwNcw4zzZfvkKXIUdBoD8hp3pi5Fxha+yWycptEtJ0BDCG9Nz99MfE3G0qKZ2VFOtxgpgb9hsP29t6p3ATJYgL17R8vy1q5IEiJb20HoB1P3CoLsfE7gDeTsNO+kddqnwVWaoJbzGFBjsJzN+wqlxDEIlsXGICEkA6ASND66EEfKhvG+dsKmdEQ3iFAXUhczA5pIPmAEDbWT2pWs3cK2HtgL/ANQ1wlQC3kXMPKPPlWTIGnr1pzYfdTv5G9JpvXAQjTCv8BIYBtSIBI1Mg7np0qpiCR0j169f9/3oBjeJeM9uLZwtoT4ZZrrW9CSSSTEz1AOpo1y3jXuZ1uAZviJ0ESToOsARodRPYitezEWFscuRorEbYHadfUfr8tDWcWxbAMobQqunVhBJ1/8A6mKvXrfb7/8AH6mgfF4gmJMR/D8zSmmyqWnFD8RiWJ1PUCR6CNPuq1YcHN1217d4/OgrXBIg/wA9qvYS8Nddzt7f4ppCYyRW8ZdCt3JAj7o1+6qZeTLGT0HQfvW5XMS3f+AVj4f+fz8qy1KRbiVHfxQ0nbX57V7d4kCQIAB026etRYzDEroNvwqth+DYi4CVtOQBJJECO8npTWOACRJG5ztC0ftBIBmToJB0IntRO1ZUb/d1P7Cl/h9lrWXMJJ1Ub76D3PpTDirXhKDcYZzH9JTLR6tsDSZiHHSr40EgHSxMOXaFA9SfhUd/58qvWOH7i2f/ACuHT7uw9NzWi4kkL5RatHcvAI3kBSZZ+k7Vvh+KXQSQoFiDAZrcgdWldxO/vvoBSrACd4D3bQ7H8JUjyhmJ0n9hFLXEOAsu2p9NQPSep9qazxe4s3Ua27ENtlYIp20J+KCZ0qLhqEIlwMreIzKVgSh1IyjpPp3FG2QhbJwLjztJq8JuA66fpRrhGFKBQ7ZlRi6LsFY6FvVtB91MtzAyYjU9KxMIojTX8B+5ozIaUIhAKu4PGnQnUj4V7ep+ewozgreYFn26+u23WBFCuH4BfjYwJA0OrR+XeaLq4ZlA0Ggygaj2/KfalJythczCNu/QegHftVhMKSdtenoO57CpMKhEM3SYHQaT9/567CsZtOoneep/xXqpZe1CVtjQrJ796yo2idx869peSZiua8bw2ceQafZ9R3J/ele5acGCBWVlUNKU8mu1a4Zh2Z5HT8Kc+HNBAHmbvtJ9O3uaysr0hWRo/YwQUh7mp3CiY+/5b70g892E8ZriLlJPm7ExEgetZWUMZ8y9LtqVVJJgU48mYrwyyjdozHvG34msrKpf0po+10KzigoIO+hgDadPMepJ7TQHnDjHh2A4trcGbLDqpQNBiUO8Hr3A36ZWUhv3J7/tK5nw/iRtC5Fu2zP1dA2Ua6KCIG/4CsTEWsiobQktNy5uwE7INgAPvNeVlUqNa/WmjK3nBQKmY/CpPlI7e3rRTgt1xibVskB1YBpkyQ0E++Ty9oFZWVj/ALSiZ9wT9fsg0t8YdFBHUTr0HoPX1/3r2sqSMK2UoDheBF/6jaA6qJ1M9Sf0qyMAAYH8++srKJzza1kbQArNrCx+n86fnU9uwKyspZKY0La4AK8wuOuXB9Xsg+Y5nJYZn7CTACjtWVleCt4oFF3qFtxYojNNuHCQApjIwJhpgSY7VTwVi6Lb3FGa6QGBJH9NNSX827GBEajXrFeVlEQmPc4Dte8I4iM3/UedBqFImW9Dus9e9Xr2PGKunxWKIqMLarsoA0EDppWVlCe6VULAY8vVLauNVPcQfadPnP4Uxf8AG0TDCxaUEtrccqJPoJ2H7d6ysoiKSYfN2jHD7jIBbLZgyK4PWDMgncj50Vs4VcoLb9APbvWVlaAuZydSaUyGekSND6fnpFFEAtDaX/AdZP4/yZysoElWLbsTDNtqY6b9P5+pzEXp16DQf5rKytPSwdqmVnXT8aysrKWmr//Z",
    chocolate: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWFb3C7Gg50NLtX2qQCslusGCmdcqP-WUuIg&s",
    caramel:   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5yovUHhG2rFJES4xSlgu8FGSjb9xOdmYcOg&s"
  };

 const favoriteItems = [
    { id: 1, name: "Caramel Macchiato", desc: "Perfect harmony of caramel and vanilla syrups.", price: "$4.50", img: "https://www.theendlessmeal.com/wp-content/uploads/2025/03/Caramel-Macchiato-Recipe-2.jpg" },
    { id: 2, name: "Iced White Mocha", desc: "Signature espresso with white chocolate sauce.", price: "$5.25", img: "https://cloveandcumin.com/wp-content/uploads/2024/04/Iced-White-Chocolate-Mocha.jpg" },
    { id: 3, name: "San Sebastian", desc: "Creamy Spanish cheesecake with a burnt top.", price: "$6.00", img: "https://www.hacibekirkunc.com/upload/san-sebastian-cheesecake-1-12143.jpg" }
  ];
  const testimonials = [
    { id: 1, name: "Jessica Lane", text: "The loyalty program is a game changer. My 7th cup was totally free!", rating: 5 },
    { id: 2, name: "David Chen", text: "Best Iced White Mocha in town. Highly recommended!", rating: 5 },
    { id: 3, name: "Mark Peterson", text: "Professional service and a great atmosphere for work.", rating: 4 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  // Butona tıklandığında çalışan fonksiyon
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true); // Rengi yeşile çevirir
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000); // 3 saniye sonra sarıya döner
  };

  return (
    <div className="home-container bg-creme">
      {/* 1. Navigation */}
      <nav className="navbar navbar-expand-lg navbar-creme py-3 shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center fw-bold fs-3 text-brown" to="/">
            Bite & Brew
          </Link>
          <div className="navbar-nav ms-auto align-items-center flex-row gap-3">
            <Link className="nav-link text-brown" to="/"><Search size={20} /></Link>
            <Link className="nav-link text-brown" to="/login"><UserCircle size={20} /></Link>
            <Link className="btn btn-brown d-flex align-items-center rounded-pill px-3" to="/checkout">
              <ShoppingBag size={18} className="me-2" />
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="hero-section py-5 bg-creme">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-md-6 text-start position-relative">
              <div className="brush-stroke-hero top-0 start-0 opacity-10 position-absolute"></div>
              <h1 className="display-3 fw-bold text-brown mb-3 position-relative z-1">Sweet Moments<br />Start Here.</h1>
              <p className="lead text-brown mb-4 w-75 position-relative z-1">Freshly roasted coffee and delightful desserts to make every moment special. Join our loyalty program and get every 7th cup for free!</p>
              <Link to="/menu" className="btn btn-brown btn-lg fw-bold px-5 rounded-pill shadow position-relative z-1 bounce-on-hover">
                Explore Menu
              </Link>
            </div>
            <div className="col-md-6 text-center hero-coffee-img position-relative" style={{ height: '400px' }}>
                <div className="brush-stroke-hero-right top-0 start-0 opacity-10 position-absolute"></div>
                <img key={currentImage} src={sliderImages[currentImage]} alt="Cafe Atmosphere" className="img-fluid rounded-circle shadow-lg hero-img position-relative z-1 hero-img-transition" style={{ objectFit: 'cover', width: '350px', height: '350px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Info Blocks & Campaign */}
      <section className="py-5 bg-creme border-bottom">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-md-5 d-flex align-items-center p-4 rounded-4 bg-creme-dark shadow-sm border border-light">
              <div className="icon-block bg-creme rounded-circle p-3 shadow-sm me-4">
                 <Clock size={32} className="text-brown" />
              </div>
              <div>
                <h4 className="fw-bold text-brown mb-1">Opening Hours</h4>
                <p className="text-muted mb-0">Everyday <br /> 08:00 AM - 10:00 PM</p>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center p-4 rounded-4 highlight-campaign shadow-lg ms-md-4">
               <div className="icon-block bg-warning rounded-circle p-3 shadow-sm me-4">
                 <Gift size={32} className="text-brown" />
               </div>
              <div>
                <h4 className="fw-bold mb-1 text-white">Special Offer!</h4>
                <p className="mb-0 fw-medium text-white">Buy 6 coffees, get 1 completely <span className="text-warning fw-bold fs-5">FREE!</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Favorites of the Month */}
      <section className="py-5 bg-creme-dark">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold text-brown d-inline-flex align-items-center">
              <Sparkles className="me-2 text-warning" size={36} />
              Favorites of the Month
              <Sparkles className="ms-2 text-warning" size={36} />
            </h2>
            <p className="text-muted el-yazisi fs-5 mt-2">The legendary flavors most loved by our community!</p>
          </div>
          <div className="row justify-content-center g-4">
            {favoriteItems.map(item => (
              <div key={item.id} className="col-md-4">
                <div className="card h-100 border-0 shadow-lg rounded-5 position-relative overflow-hidden favorite-card-hover">
                  <div className="position-absolute top-0 end-0 bg-warning text-brown px-3 py-2 rounded-bottom-start fw-bold shadow-sm d-flex align-items-center z-1" style={{ borderBottomLeftRadius: '15px' }}>
                    <Star size={18} className="me-1" fill="currentColor" /> Top Choice
                  </div>
                  <img src={item.img} alt={item.name} className="img-fluid w-100" style={{ height: '240px', objectFit: 'cover' }} />
                  <div className="card-body p-4 bg-white d-flex flex-column text-center">
                    <h4 className="fw-bold text-brown mb-2">{item.name}</h4>
                    <p className="text-muted small mb-4">{item.desc}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="fs-4 fw-bold text-brown">{item.price}</span>
                      <Link to="/menu" className="btn btn-brown rounded-pill px-4 fw-semibold bounce-on-hover">
                        Order Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Signature Desserts Section */}
      <section className="py-5 bg-creme cake-cards-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold text-brown">Our Signature Desserts</h2>
          </div>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-lg rounded-5 bg-cake-pink p-4 flex-column">
                <h3 className="fw-bold text-brown mb-4">Berry Tartlet</h3>
                <img src={cakeImages.raspberry} alt="Berry Dream Cake" className="img-fluid rounded-4 mb-4 mx-auto cake-card-img" style={{objectFit: 'cover'}}/>
                <div className="mt-auto d-flex flex-column align-items-center w-100">
                    <p className="text-brown fw-semibold el-yazisi mb-2">Forest Fruits & Cream</p>
                    <Link to="/menu" className="btn btn-brown-light w-100 rounded-pill fw-semibold btn-sm mt-2 bounce-on-hover">Order Now</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-lg rounded-5 bg-cake-orange p-4 flex-column">
                <h3 className="fw-bold text-brown mb-4">Dark Chocolate Brownie</h3>
                <img src={cakeImages.chocolate} alt="Chocolate Passion Cake" className="img-fluid rounded-4 mb-4 mx-auto cake-card-img" style={{objectFit: 'cover'}}/>
                 <div className="mt-auto d-flex flex-column align-items-center w-100">
                    <p className="text-brown fw-semibold el-yazisi mb-2">Double Dark Chocolate</p>
                    <Link to="/menu" className="btn btn-brown w-100 rounded-pill fw-semibold btn-sm mt-2 bounce-on-hover">Order Now</Link>
                 </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-lg rounded-5 bg-cake-purple p-4 flex-column">
                <h3 className="fw-bold text-brown mb-4">Cafe Mocha</h3>
                <img src={cakeImages.caramel} alt="Caramel Mocha Cake" className="img-fluid rounded-4 mb-4 mx-auto cake-card-img" style={{objectFit: 'cover'}}/>
                <div className="mt-auto d-flex flex-column align-items-center w-100">
                    <p className="text-brown fw-semibold el-yazisi mb-2"> Dark Chocolate & Coffee Blend</p>
                    <Link to="/menu" className="btn btn-brown-light w-100 rounded-pill fw-semibold btn-sm mt-2 bounce-on-hover">Order Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-5 bg-white border-top">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold text-brown">Trusted by Coffee Lovers</h2>
          </div>
          <div className="row g-4">
            {testimonials.map(t => (
              <div key={t.id} className="col-md-4">
                <div className="card border-0 shadow-sm p-4 rounded-4 h-100 testimonial-card">
                  <Quote className="text-warning mb-3 opacity-50" size={32} />
                  <p className="el-yazisi mb-3 fs-5 italic">"{t.text}"</p>
                  <div className="mt-auto d-flex align-items-center">
                    <div className="bg-brown text-white rounded-circle p-2 me-3 fw-bold shadow-sm" style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>{t.name.charAt(0)}</div>
                    <div>
                      <h6 className="fw-bold mb-0">{t.name}</h6>
                      <div className="text-warning">
                        {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Loyalty Program Section (3x2 GRID) */}
      <section className="sadakat-section py-5 bg-creme-dark border-top border-bottom">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-md-6 text-center position-relative">
                <div className="brush-stroke-latte-art top-0 start-0 opacity-10 position-absolute"></div>
                <div className="loyalty-card-visual p-4 rounded-5 shadow-lg position-relative z-1 mx-auto bg-creme" style={{ maxWidth: '400px' }}>
                  <div className="loyalty-card-inner p-4 rounded-4 d-flex flex-column align-items-center">
                    <h4 className="fw-bold text-brown mb-4 el-yazisi">Bite & Brew Rewards</h4>
                    <div className="container-fluid mb-4">
                      <div className="row g-3 justify-content-center">
                        {[...Array(6)].map((_, index) => (
                          <div key={index} className="col-4 d-flex justify-content-center">
                             <div className="stamp-box bg-brown text-creme rounded-circle shadow-sm pop-in-animation" style={{ animationDelay: `${index * 0.15}s` }}>
                                <Coffee size={28} />
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-100 pt-3 border-top border-brown-dashed d-flex flex-column align-items-center mt-2">
                      <span className="small text-brown-light fw-bold mb-3 text-uppercase tracking-wider">7th Coffee is on Us!</span>
                      <div className="stamp-box bg-warning text-brown rounded-circle shadow border border-3 border-white pulse-gift" style={{width:'80px', height:'80px'}}>
                        <Gift size={36} />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div className="col-md-6 text-start">
              <h2 className="fw-bold text-brown mb-3">Loyalty Has Its Perks.</h2>
              <p className="lead text-brown mb-4 position-relative z-1">Start earning with every sip! Fill up your digital loyalty card, and get your 7th coffee completely on us. Sign up today to start collecting stamps.</p>
              <div className="text-start position-relative z-1">
                <Link to="/login" className="btn btn-brown-light btn-lg fw-bold px-5 rounded-pill shadow d-inline-flex align-items-center bounce-on-hover">
                    Join the Club
                    <ChevronRight size={20} className="ms-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Newsletter Section (DÜZELTİLEN KISIM) */}
      <section className="py-5 bg-dark text-white text-center newsletter-section">
        <div className="container py-5">
          <h2 className="fw-bold display-5 mb-3">Keep In Touch</h2>
          <p className="mb-4 opacity-75 fs-5">Subscribe for exclusive weekly rewards and 10% off your next order.</p>
          <form 
            onSubmit={handleSubscribe} 
            className="d-flex justify-content-center gap-0 mx-auto newsletter-form flex-nowrap"
            style={{ maxWidth: '550px' }}
          >
            <input 
              type="email" 
              className="form-control form-control-lg border-0 shadow-none newsletter-input" 
              placeholder="Your Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <button 
              type="submit" 
              className={`btn ${isSubscribed ? 'btn-success' : 'btn-warning'} btn-lg fw-bold shadow newsletter-btn transition-all`}
            >
               {isSubscribed ? (
                 <><CheckCircle size={18} className="me-2 d-none d-sm-inline"/> Joined!</>
               ) : (
                 <><Send size={18} className="me-2 d-none d-sm-inline"/> Join Now</>
               )}
            </button>
          </form>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="footer py-5 bg-dark text-white position-relative overflow-hidden">
        <div className="container position-relative z-1">
          <div className="row align-items-center justify-content-between g-4">
             <div className="col-md-6 text-start">
                 <h4 className="fw-bold mb-3 text-warning">Bite & Brew</h4>
                 <p className="small opacity-75 el-yazisi">Freshness in every bite, perfection in every brew.</p>
             </div>
             <div className="col-md-6 d-flex justify-content-end gap-3">
                 <a href="#" className="text-warning"><Globe size={24} /></a>
                 <a href="#" className="text-warning"><Camera size={24} /></a>
                 <a href="#" className="text-warning"><MessageCircle size={24} /></a>
             </div>
          </div>
          <hr className="my-4 opacity-25" />
          <p className="text-center small opacity-50 mb-0">© 2026 Bite & Brew Cafe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;