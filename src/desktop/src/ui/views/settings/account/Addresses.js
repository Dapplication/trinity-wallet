import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import { formatValue, formatUnit } from 'libs/iota/utils';

import Scrollbar from 'ui/components/Scrollbar';
import Clipboard from 'ui/components/Clipboard';

import css from './addresses.scss';

/**
 * Account addresses component
 */
class Addresses extends PureComponent {
    static propTypes = {
        /** @ignore */
        account: PropTypes.object,
        /** @ignore */
        t: PropTypes.func.isRequired,
    };

    render() {
        const { account, t } = this.props;
        const isSpent = ({ spent: { local, remote } }) => local || remote;

        return (
            <form>
                <fieldset>
                    <ul className={css.addresses}>
                        <Scrollbar>
                            {account.addressData
                                .map((addressData) => {
                                    const address = addressData.address + addressData.checksum;
                                    return (
                                        <li key={address}>
                                            <p className={isSpent(addressData) ? css.spent : null}>
                                                <Clipboard
                                                    text={address}
                                                    title={t('receive:addressCopied')}
                                                    success={t('receive:addressCopiedExplanation')}
                                                >
                                                    {addressData.address.match(/.{1,3}/g).join(' ')}{' '}
                                                    <mark>
                                                        {addressData.checksum.match(/.{1,3}/g).join(' ')}
                                                    </mark>
                                                </Clipboard>
                                            </p>
                                            <strong>
                                                {formatValue(addressData.balance)}
                                                {formatUnit(addressData.balance)}
                                            </strong>
                                        </li>
                                    );
                                })}
                        </Scrollbar>
                    </ul>
                </fieldset>
            </form>
        );
    }
}

export default withI18n()(Addresses);
