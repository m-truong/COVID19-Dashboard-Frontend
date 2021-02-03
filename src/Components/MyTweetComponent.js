import Tweet from 'react-tweet'

export default function MyTweetComponent({tweetData}) {
    const linkProps = {target: '_blank', rel: 'noreferrer'}
    return (
        <Tweet data={tweetData} linkProps={linkProps} />
    )
}

