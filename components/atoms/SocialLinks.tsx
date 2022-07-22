import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faInstagram, faReddit, faTelegram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { classNames } from "@/common/helpers";

export const SocialLinks = ({enableDarkMode}: {enableDarkMode?: boolean}) => {
  return (
    <div id="social-media-links" className={classNames('sm:w-[23em] w-full flex sm:space-x-6 space-x-4', enableDarkMode ? 'dark:text-light-200 text-dark-300' : 'text-light-200')}>
      <a href="https://www.youtube.com/channel/UCoZiBsHIAm_EGQbTGpSrcLA" target='_blank'
        className={classNames(enableDarkMode ? 'dark:text-light-200 text-dark-300 hover:text-indigo-700' : 'text-light-200 hover:text-indigo-700')}>
        <FontAwesomeIcon width={21} height={21} icon={faYoutube} />
      </a>
      <a href="https://www.discord.gg/team3d" target='_blank' className={classNames(enableDarkMode ? 'dark:text-light-200 text-dark-300 hover:text-indigo-700' : 'text-light-200 hover:text-indigo-700')}>
        <FontAwesomeIcon width={21} height={21} icon={faDiscord} />
      </a>
      <a href="https://www.reddit.com/r/VIDYAbyTeam3D/" target='_blank' className={classNames(enableDarkMode ? 'dark:text-light-200 text-dark-300 hover:text-indigo-700' : 'text-light-200 hover:text-indigo-700')}>
        <FontAwesomeIcon width={21} height={21} icon={faReddit} />
      </a>
      <a href="http://t.me/Team3D_Official" target='_blank' className={classNames(enableDarkMode ? 'dark:text-light-200 text-dark-300 hover:text-indigo-700' : 'text-light-200 hover:text-indigo-700')}>
        <FontAwesomeIcon width={21} height={21} icon={faTelegram} />
      </a>
      <a href="https://twitter.com/Team3D_Official" target='_blank' className={classNames(enableDarkMode ? 'dark:text-light-200 text-dark-300 hover:text-indigo-700' : 'text-light-200 hover:text-indigo-700')}>
        <FontAwesomeIcon width={21} height={21} icon={faTwitter} />
      </a>
      <a href="http://instagram.com/vidya.games_official/" target='_blank'
        className={classNames(enableDarkMode ? 'dark:text-light-200 text-dark-300 hover:text-indigo-700' : 'text-light-200 hover:text-indigo-700')}>
        <FontAwesomeIcon width={21} height={21} icon={faInstagram} />
      </a>
  </div>
  )
}