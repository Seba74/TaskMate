import { useAuth } from '@/context/AuthContext';
import { Stack } from 'native-base';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserHeader = () => {

const { authState } = useAuth();

  return (
    <View style={styles.wrapper}>
        <View style={styles.header}>
            <Image source={{ uri: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" }} style={styles.image} />
            <Text style={styles.name}>
                {`${authState?.lastname}, ${authState?.name}`}
            </Text>
        </View>

        <Stack mt={5}>
            <Text style={styles.label}>Proyectos: 3</Text>
            <Text style={styles.label}>Colaborador: 5</Text>
            <Text style={styles.label}>Tareas Asignadas: 10</Text>
        </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 15,
        backgroundColor: 'darkcyan',
    },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  name: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'normal',
  },
});

export default UserHeader;
