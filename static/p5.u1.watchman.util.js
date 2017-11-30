/*
* NEEDS WEB SERVER.
* RUN AS LOCAL JS FILE WILL NOT WORK.
*
* WatchmanUtil : Utility Library for Watchman and Watchman-Worker(Web-Worker).
*  - To avoid mismatch, share functions between Watchman and Watchman-Worker.
*  - Global var are not shared between threads. You may get 'undefined'.
*
* 2017/11/30
* @author Yuichi Ito yuichi@yuichi.com
*/

function watchman_print(t){
  console.log('watchman_print: ' + t)
}
