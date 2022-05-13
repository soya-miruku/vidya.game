import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faInstagram, faReddit, faTelegram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { VText } from '../atoms/VText';
import { Card, ICardProps } from './Card';
import { classNames } from '@/common/helpers';

export interface ITeamCardProps extends ICardProps {
  role?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  instagram?: string;
  github?: string;
}

export const TeamCard: React.FC<ITeamCardProps> = ({role, discord, twitter, telegram, instagram, label, title, subtitle, url, avatar}) => {
  return <Card 
  footer={
    <div className='flex flex-col justify-center items-center'>
      <VText size='sm'>Footer - {role}</VText>
      <div className={classNames('flex space-x-4', !(discord && twitter && telegram && instagram) ? 'hidden' : '')}>
      { 
        discord && <a href={discord} target='_blank' className="text-accent-dark-200 hover:text-indigo-700">
          <FontAwesomeIcon icon={faDiscord} />
        </a>
      }
      {telegram &&<a href={telegram} target='_blank' className="text-accent-dark-200 hover:text-indigo-700">
        <FontAwesomeIcon icon={faTelegram} />
      </a>}
      {twitter &&
      <a href={twitter} target='_blank' className="text-accent-dark-200 hover:text-indigo-700">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      }
      {instagram && <a href={instagram} target='_blank'
        className="text-accent-dark-200 hover:text-indigo-700">
        <FontAwesomeIcon icon={faInstagram} />
      </a> }
      </div>
    </div>
  }
   label={label} title={title} subtitle={subtitle} image={avatar} url={url} long={false} wide={false}></Card>
}