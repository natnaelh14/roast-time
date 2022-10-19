import styles from 'styles/ColorToggle.module.css';
import { useColorScheme } from 'contexts/ColorSchemeContext';

const ColorToggle = () => {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    return (
            <div className={`colorScheme === 'dark' ? ${styles.darkMode} : ${styles.lightMode}`}>
              <div className={styles.container}>
              <span className='text-gray-300 dark:text-gray-500'>{colorScheme === 'dark' ? 'Dark Mode': 'Light Mode'}</span>
                <div className={styles.switchCheckbox}>
                  <label className={styles.switch}>
                    <input type="checkbox" onChange={() => toggleColorScheme()} checked={colorScheme === 'dark'} />
                    <span className={`${styles.slider} ${styles.round}`}> </span>
                  </label>
                </div>
              </div>
            </div>
    );
}


export default ColorToggle;