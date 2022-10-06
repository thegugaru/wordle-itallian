/* eslint-disable no-useless-escape */
import randomItem from 'random-item';

export const winMessage = (n: number) => {
    switch(n) {
        case 1:
            return randomItem(['NGULO!', 'Alla caccia del fazzo', `L'uno è la solitudine`, ` c[○┬●]כ `, '\ō͡≡o˞̶']);

        case 2:
            return randomItem(['Quasi geniə!', 'Geniə o fortunellə?', 'Bravə nonché breve', `٩(͡๏̮͡๏)۶`, `(. ͡ᵔ ͜ʖ ͡ᵔ.)`, `̿' ̿'\̵͇̿̿\з=(◕_◕)=ε/̵͇̿̿/'̿'̿ ̿`, '(¯`·._.·(¯`·._.· super ·._.·´¯)·._.·´¯)', 'ʕ•̫͡•ʕ*̫͡*ʕ•͓͡•ʔ-̫͡-ʕ•̫͡•ʔ*̫͡*ʔ-̫͡-ʔ']);

        case 3:
            return randomItem(['Praeclare!', '\\( ﾟ◡ﾟ)/', '凸(¬◡¬)凸', '\,,/(^‿^)\,,/', `•|龴◡龴|•`, '(◔/‿\◔)', `(♥_♥)`, '٩(^‿^)۶', 'ヽ༼ຈل͜ຈ༽ﾉ', '♪└(￣◇￣)┐♪└(￣◇￣)┐♪', 'La fortuna del 3 non è opera del diavolo']);

        case 4:
            return randomItem(['•͡˘㇁•͡˘', 'ʕʘ̅͜ʘ̅ʔ', '≧◔◡◔≦', `@('_')@`, `龴ↀ◡ↀ龴`, `( ͡ʘ ͜ʖ ͡ʘ)`, `(ʃƪˆ▿ˆ)`]);

        case 5:
            return randomItem(['Poteva andare peggio!', 'Piano ma lontano…', `(˚ㄥ_˚)`, `ˁ˚ᴥ˚ˀ`, `(►.◄)`, '@( * O * )@', '༼☉ɷ⊙༽', '( ͡° ͜ʖ ͡°)', `\\˚ㄥ˚\\`, `\\(/.__.)/  \\(.__.\\)`]);

        default:
            return randomItem([`‹’’›(Ͼ˳Ͽ)‹’’›`, 'Fiuuuuuuuu!', `(ノಠ益ಠ)ノ彡`, '(╯°□°）╯︵ [_]||', `^(;,;)^`]) || 'Fiuuuuuuuu!';
    }
}

export const failMessage = () => {
    const messages = [
        'Mannaccia la pupazza!',
        'Poffarbacco',
        'Nuuuuuuu :(',
        'Accidempoli',
        'Acciderba!',
        'Che pasticcio…',
        'Ecastor, Mecastor',
        'Malum, Nefas!',
        '(╯︵╰,)',
        '(✖╭╮✖)',
        'ε(´סּ︵סּ`)з',
        '(╥﹏╥)',
        '༼ つ ◕_◕ ༽つ ',
        '¯\\_(ツ)_/¯',
        '¯\\_(ツ)_/¯'
    ];

    return randomItem(messages);
}
