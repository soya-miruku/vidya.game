import { Logo } from "./logo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faInstagram, faReddit, faTelegram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { PagesByCategory } from "../common/viwablePages";
import Link from "next/link";
import { classNames } from "../common/helpers";
import styles from '../css/footer.module.scss';

const Footer = () => {
return (
<footer className={classNames('w-full px-4 py-12 h-3/6 bg-transparent overflow-x-clip', styles['grid-container'])}>
    {/* <div className={`${styles['grid-container']}`}></div> */}

  <div className={classNames("max-w-5xl mx-auto flex flex-col justify-start items-center w-full", styles['inwards'])}>
    <div className="w-full flex flex-row justify-betweem items-center space-x-4">
      <div className="sm:w-full w-72">
        <Logo enableDarkMode={false}/>
      </div>
      <div id="social-media-links" className="sm:w-[28em] w-full text-white sm:space-x-8 space-x-4 text-2xl">
        <a href="https://www.youtube.com/channel/UCoZiBsHIAm_EGQbTGpSrcLA" target='_blank'
          className="text-white hover:text-indigo-700">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a href="https://www.discord.gg/team3d" target='_blank' className="text-white hover:text-indigo-700">
          <FontAwesomeIcon icon={faDiscord} />
        </a>
        <a href="https://www.reddit.com/r/VIDYAbyTeam3D/" target='_blank' className="text-white hover:text-indigo-700">
          <FontAwesomeIcon icon={faReddit} />
        </a>
        <a href="http://t.me/Team3D_Official" target='_blank' className="text-white hover:text-indigo-700">
          <FontAwesomeIcon icon={faTelegram} />
        </a>
        <a href="https://twitter.com/Team3D_Official" target='_blank' className="text-white hover:text-indigo-700">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="http://instagram.com/vidya.games_official/" target='_blank'
          className="text-white hover:text-indigo-700">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </div>
    <div className="flex flex-row w-full flex-wrap gap-x-[100px]">
      {Object.keys(PagesByCategory).map((category, i) => {
      return (
      <div key={category} className="flex flex-col justify-start max-w-[320px] px-2 mt-12">
        <div className="text-true-light-200 sm:text-xl font-bold">
          <h1>{category.toUpperCase()}</h1>
        </div>
        <div>
          <ul className="mt-6 space-y-3">
            {PagesByCategory[category].map(page => {
            return (
            <li key={page.slug} className="text-[14px] tracking-high-wide flex justify-start items-center">
              <Link href={page.active ? page.url : '/soon' }>
              <a className={classNames('', page.active ? "text-accent-dark-200 hover:text-white" : "text-accent-dark-100/50"
                )}>{page.displayName}</a>
              </Link>
              {!page.active && <span className='text-[8px] py-1 pb-[2.5px] px-2 mx-2 tracking-high-wide text-true-dark-200 dark:bg-true-light-200/50 rounded-md'>SOON</span>}

            </li>
            )
            })}
          </ul>
        </div>
      </div>
      )
      })}
      <div className="flex flex-col justify-start max-w-[320px] sm:px-12 mt-12">
        <div className="text-true-light-200 sm:text-xl font-bold font-saria">
          <h1>BUY AT</h1>
        </div>
        <div>
          <ul className="mt-5 -ml-1 space-y-3">
            <li className="text-[14px] tracking-high-wide font-saria">
              <a href="https://app.uniswap.org/#/swap?outputCurrency=0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30" target='_blank' className="text-accent-dark-200 hover:text-white space-x-2 flex justify-start items-center">
                <span className="w-5 h-5">
                  <svg fill="white" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.152 1.551c-.188-.029-.196-.032-.107-.045.17-.026.57.009.846.074.644.152 1.23.542 1.856 1.235l.166.184.238-.038c1.002-.16 2.02-.033 2.873.358.235.108.605.322.65.377.016.018.043.13.06.251.064.418.033.737-.096.976-.07.13-.074.171-.027.283a.274.274 0 0 0 .246.154c.212 0 .44-.34.545-.814l.042-.189.083.094c.457.514.815 1.214.876 1.712l.016.13-.076-.118a1.462 1.462 0 0 0-.435-.453c-.306-.201-.63-.27-1.486-.315-.774-.04-1.212-.106-1.646-.247-.739-.24-1.111-.558-1.989-1.702-.39-.509-.63-.79-.87-1.016-.545-.515-1.08-.785-1.765-.89Z">
                    </path>
                    <path
                      d="M10.85 2.686c.019-.34.065-.565.159-.77a.825.825 0 0 1 .077-.148c.005 0-.011.06-.036.133-.068.2-.08.472-.032.789.06.402.093.46.52.894.201.204.434.46.519.571l.154.2-.154-.143c-.188-.175-.62-.517-.716-.566-.064-.032-.074-.032-.113.007-.037.036-.044.09-.05.346-.007.399-.062.655-.194.91-.071.14-.082.11-.018-.047.048-.116.053-.168.053-.554 0-.775-.094-.962-.637-1.28a5.971 5.971 0 0 0-.504-.26 1.912 1.912 0 0 1-.246-.12c.015-.015.545.139.758.22.318.122.37.137.409.123.025-.01.038-.085.05-.305ZM4.517 4.013c-.381-.522-.618-1.323-.566-1.922l.015-.185.087.015c.164.03.445.134.577.214.361.218.518.505.677 1.243.047.216.108.46.136.544.045.133.217.444.356.646.1.146.034.215-.188.195-.339-.03-.798-.345-1.094-.75ZM10.386 7.9c-1.784-.713-2.412-1.333-2.412-2.378 0-.154.005-.28.012-.28.006 0 .075.05.153.113.362.288.767.411 1.889.574.66.096 1.03.173 1.373.286 1.09.359 1.763 1.087 1.924 2.08.046.288.02.828-.057 1.113-.06.225-.242.63-.29.646-.014.005-.027-.046-.03-.116-.018-.372-.208-.735-.526-1.007-.362-.309-.848-.555-2.036-1.03ZM9.134 8.197a3.133 3.133 0 0 0-.086-.375l-.046-.135.085.095c.117.13.21.297.288.52.06.17.066.22.066.496 0 .271-.008.328-.064.48a1.518 1.518 0 0 1-.376.596c-.326.33-.745.512-1.35.588-.105.013-.411.035-.68.049-.679.035-1.126.108-1.527.248a.324.324 0 0 1-.115.027c-.016-.016.258-.178.483-.286.318-.153.635-.236 1.345-.353.35-.058.713-.129.805-.157.868-.264 1.315-.947 1.172-1.793Z">
                    </path>
                    <path
                      d="M9.952 9.641c-.237-.506-.292-.995-.162-1.451.014-.05.036-.089.05-.089.013 0 .07.03.124.067.11.073.328.196.912.512.728.395 1.144.7 1.426 1.05.247.305.4.654.474 1.078.042.24.017.82-.045 1.062-.196.764-.65 1.364-1.3 1.714-.095.051-.18.093-.19.093-.009 0 .026-.087.077-.194.219-.454.244-.895.079-1.386-.102-.301-.308-.668-.724-1.289-.484-.72-.602-.913-.721-1.167ZM3.25 12.374c.663-.556 1.486-.95 2.237-1.072a3.51 3.51 0 0 1 1.161.045c.48.122.91.396 1.133.721.218.319.312.596.41 1.214.038.243.08.488.092.543.073.32.216.576.392.704.28.204.764.217 1.239.033a.618.618 0 0 1 .155-.048c.017.017-.222.176-.39.26a1.334 1.334 0 0 1-.648.156c-.435 0-.796-.22-1.098-.668a5.3 5.3 0 0 1-.296-.588c-.318-.721-.475-.94-.844-1.181-.322-.21-.737-.247-1.049-.095-.41.2-.524.72-.23 1.05a.911.911 0 0 0 .512.266.545.545 0 0 0 .619-.544c0-.217-.084-.34-.295-.436-.289-.129-.598.022-.597.291 0 .115.051.187.167.24.074.033.076.035.015.023-.264-.055-.326-.372-.114-.582.256-.252.784-.141.965.204.076.145.085.433.019.607-.15.39-.582.595-1.022.483-.3-.076-.421-.158-.782-.527-.627-.642-.87-.767-1.774-.907l-.174-.027.197-.165Z">
                    </path>
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M.308.884C2.402 3.41 3.845 4.452 4.005 4.672c.132.182.082.346-.144.474a1.381 1.381 0 0 1-.515.143c-.147 0-.198-.056-.198-.056-.085-.08-.133-.066-.57-.837A132.96 132.96 0 0 0 1.45 2.67c-.032-.03-.031-.03 1.067 1.923.177.407.035.556.035.614 0 .118-.033.18-.179.343-.244.27-.353.574-.432 1.203-.088.705-.336 1.203-1.024 2.056-.402.499-.468.59-.57.792-.128.253-.163.395-.177.714-.015.339.014.557.118.88.09.284.186.47.429.844.21.323.33.563.33.657 0 .074.014.074.34.001.776-.174 1.407-.48 1.762-.857.22-.233.271-.361.273-.68.001-.208-.006-.252-.063-.372-.092-.195-.26-.358-.63-.61-.486-.33-.694-.595-.75-.96-.048-.3.007-.511.275-1.07.278-.58.347-.827.394-1.41.03-.377.071-.526.18-.646.114-.124.216-.166.498-.204.459-.063.75-.18.99-.4a.853.853 0 0 0 .31-.652l.01-.21-.117-.134C4.098 4.004.026.5 0 .5-.005.5.133.673.308.884Zm.976 9.815a.37.37 0 0 0-.115-.489c-.15-.1-.385-.052-.385.077 0 .04.022.069.072.094.084.043.09.091.024.19-.067.099-.061.186.015.246.123.095.297.043.389-.118ZM4.925 5.999c-.215.065-.424.292-.49.53-.039.145-.016.4.043.478.096.127.188.16.439.159.49-.003.916-.212.966-.474.04-.214-.147-.51-.405-.641a.965.965 0 0 0-.553-.052Zm.574.445c.075-.107.042-.222-.087-.3-.244-.149-.615-.026-.615.204 0 .115.193.24.37.24.118 0 .28-.07.332-.144Z">
                    </path>
                  </svg>
                </span>
                <h1 className="mt-1">
                  UNISWAP
                </h1>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="flex justify-between w-full pt-16 text-true-light-200 font-saria">
      <h1 className="w-2/3 uppercase">Copyright © Team3D 2021</h1>
      <ul className="flex space-x-7 w-1/3 justify-end">
        <li>
          <a href="/terms" className="text-true-light-200"> TERMS OF SERVICE </a>
        </li>
        <li>
          <a href="/policy" className="text-true-light-200"> PRIVACY POLICY </a>
        </li>
      </ul>
    </div>
  </div>
</footer>
)
}

export default Footer